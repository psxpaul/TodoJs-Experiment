import org.httpobjects.jetty.HttpObjectsJettyHandler
import org.httpobjects.util.ClasspathResourcesObject
import org.httpobjects.{Request,HttpObject}
import org.httpobjects.DSL.{OK,NO_CONTENT,Bytes,Json}
import org.codehaus.jackson.map.ObjectMapper
import scala.collection.mutable.ListBuffer
import java.io.ByteArrayOutputStream
import java.io.ByteArrayInputStream
import scala.reflect.BeanProperty

object BackendMain {
  
    case class Todo(@BeanProperty var id:Int, @BeanProperty var title:String, @BeanProperty var order:Int, @BeanProperty var completed:Boolean) {
        def this() = this(-1, "", 0, false)
    }
  
    def main(args: Array[String]) {
    	val todos = ListBuffer[Todo]()
    	var indexCounter = 0
    	val lock = new Object()
    	
    	def readTodo(req: Request):Todo = {
    		val jackson = new ObjectMapper()
    		val bytes = new ByteArrayOutputStream()
    		req.representation().write(bytes)
    		jackson.readValue(new ByteArrayInputStream(bytes.toByteArray()), classOf[Todo])
    	}

    	def writeTodo(todo: Todo) = new ObjectMapper().writeValueAsString(todo)
      
        HttpObjectsJettyHandler.launchServer(8000,
            new HttpObject("/") {
                override def get(req: Request) = OK(Bytes("text/html", getClass().getResourceAsStream("/index.html")))
            },
            new ClasspathResourcesObject("/{resource*}", getClass()),
            new HttpObject("/todos") {
                override def get(req: Request) = OK(Json(new ObjectMapper().writeValueAsString(todos.toArray)))
            },
            new HttpObject("/todo") {
                override def post(req: Request) = lock synchronized {
                	val todo = readTodo(req)
                	todo.id = indexCounter
                	indexCounter += 1
                	todos += todo
                    OK(Json(writeTodo(todo)))
                }
            },
            new HttpObject("/todo/{id}") {
                override def put(req: Request) = lock synchronized {
                	val todo = readTodo(req)
                	val todoId = req.pathVars().valueFor("id")
                	val id = Integer.parseInt(todoId)
                	
                	val indexToUpdate = todos.indexWhere(a => a.id == id)

                	todos.update(indexToUpdate, todo)
                	OK(Json(writeTodo(todo)))
                }
                
                override def delete(req: Request) = lock synchronized {
                	val todoId = req.pathVars().valueFor("id")
                	val id = Integer.parseInt(todoId)
                	val indexToRemove = todos.indexWhere(a => a.id == id)
                	todos.remove(indexToRemove)
                	NO_CONTENT()
                }
            }
        )
    }
}
