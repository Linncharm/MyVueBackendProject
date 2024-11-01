# It's a git usage for myself 😀
# There are two part of it 
- **Build a connect from Local to Remote** 
- **Clone repo from Remote to Local** 
## Part 1. Build a connect from Local to Remote
 
## First: creat a work directory and init it
- 1. Creat a directory and name it anything you want
- 2. Enter the cmd window and run this command
```plantuml
   git init
```
- 3. Create a file or move code file in it, then add all this to buffer zone 
```plantuml
   touch test.txt
   git add .
```
- 4. Then make a commit to my local repo
```plantuml
   git commit -m "xxxx"                   xxxx is the remark to the change 
```
![img_1.png](img_1.png)
- 5. Add the remote repo and name it, then use [-v] to check the detail 
```plantuml
   git remote add origin [URL]
   git remote -v
```
```
   ATTENTION!!! always use origin as the name of repo
```
![img_2.png](img_2.png)
- 6. Get the remote repo information and check the branch
```plantuml
    git fetch origin
    git branch -a
```
![img_3.png](img_3.png)
- 7. Make a tracking branch as prepare work
```plantuml
    git branch -u origin/master master 
    
    ---the first param is remote while the second is local---
```
```plantuml
    git branch -vv      [check the tracking information]
```
- 8. Then pull the repo to update branch
```plantuml
    git pull --allow-unrelated-histories
```
![img_4.png](img_4.png)
- 9. Finally directly push the commit the remote repo (Since tracking has been set)
```plantuml
    git push
```
![img_5.png](img_5.png)
- 10. 🤩It can be check on the repo commit column

![img_6.png](img_6.png)
## Part 2. Clone from remote repo and build cooperation
- 1. Creat a directory and name it anything you want
- 2. Enter the cmd window and run this command
```plantuml
    git clone [URL]
```

It will creat a .git directory with git configure in secret, and initialize it at the same time
