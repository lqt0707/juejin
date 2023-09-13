/**
 * “扫地机器人”问题
题目描述：房间（用格栅表示）中有一个扫地机器人。格栅中的每一个格子有空和障碍物两种可能。
扫地机器人提供4个API，可以向前进，向左转或者向右转。每次转弯90度。
当扫地机器人试图进入障碍物格子时，它的碰撞传感器会探测出障碍物，使它停留在原地。
请利用提供的4个API编写让机器人清理整个房间的算法。

interface Robot {
  // 若下一个方格为空，则返回true，并移动至该方格
  // 若下一个方格为障碍物，则返回false，并停留在原地
  boolean move();

  // 在调用turnLeft/turnRight后机器人会停留在原位置
  // 每次转弯90度
  void turnLeft();
  void turnRight();

  // 清理所在方格
  void clean();
}
示例:
输入:
room = [
[1,1,1,1,1,0,1,1],
[1,1,1,1,1,0,1,1],
[1,0,1,1,1,1,1,1],
[0,0,0,1,0,0,0,0],
[1,1,1,1,1,1,1,1]
],
row = 1,
col = 3
解析: 房间格栅用0或1填充。0表示障碍物，1表示可以通过。 机器人从row=1，col=3的初始位置出发。在左上角的一行以下，三列以右。

注意:
输入只用于初始化房间和机器人的位置。你需要“盲解”这个问题。换而言之，你必须在对房间和机器人位置一无所知的情况下，只使用4个给出的API解决问题。 
扫地机器人的初始位置一定是空地。
扫地机器人的初始方向向上。
所有可抵达的格子都是相连的，亦即所有标记为1的格子机器人都可以抵达。
可以假定格栅的四周都被墙包围。

命题关键字：模拟、DFS


 * @param {*} robot 
 */
interface Robot {
     // 若下一个方格为空，则返回true，并移动至该方格
     // 若下一个方格为障碍物，则返回false，并停留在原地
     boolean move();
    
      // 在调用turnLeft/turnRight后机器人会停留在原位置
     // 每次转弯90度
     void turnLeft();
     void turnRight();
    
      // 清理所在方格
      void clean();
    }
    
/**
 * @param {Robot} robot
 * @return {void}
 */
const cleanRoom = function(robot) {
    // 初始化一个 set 结构来存储清扫过的坐标
    const boxSet =  new Set()  
    // 初始化机器人的朝向
    let dir = 0  
    // 进入 dfs
    dfs(robot, boxSet, 0, 0, 0)

    // 定义 dfs  
    function dfs(robot, boxSet, i, j, dir) {
        // 记录当前格子的坐标
        let box = i + '+' + j  
        // 如果已经打扫过，那么跳过
        if(boxSet.has(box)) return 
        // 打扫当前这个格子
        robot.clean()  
        // 记住这个格子
        boxSet.add(box)

        // 四个方向试探
        for(let k=0;k<4;k++) {
            // 如果接下来前进的目标方向不是障碍物（也就意味着可以打扫）
            if(robot.move()) {
                // 从当前格子出发，试探上右左下
                let x = i, y = j
                // 处理角度和坐标的对应关系
                switch(dir) {
                    case 0:   
                        x = i - 1  
                        break
                    case 90: 
                        y = j + 1   
                        break  
                    case 180: 
                        x = i + 1  
                        break  
                    case 270: 
                        y = j - 1
                        break   
                    default:
                        break
                }
                dfs(robot, boxSet, x, y, dir)
                // 一个方向的dfs结束了，意味着撞到了南墙，此时我们需要回溯到上一个格子 
                robot.turnLeft()
                robot.turnLeft()
                robot.move()
                robot.turnRight()
                robot.turnRight()
            }
            // 转向 
            robot.turnRight() 
            dir += 90  
            dir %= 360 

        }
    }
}
