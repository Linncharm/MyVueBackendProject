# It is a Git guideline for myself 🤔

# There are **Three** part of it 
- **🔗Build a connect from Local to Remote** 
- **📖Clone repo from Remote to Local** 
- **💡Some little tip about git** 
## 🔴Part 1. Build a connect from Local to Remote
 
## First: creat a work directory and init it
- 1. Creat a directory and name it anything you want
- 2. Enter the cmd window and run this command
```shell
   git init
```
- 3. Create a file or move code file in it, then add all this to buffer zone 
```shell
   touch test.txt
   git add .
```
- 4. Then make a commit to my local repo
```shell
   git commit -m "xxxx"                   xxxx is the remark to the change 
```
![img_1.png](./png/img_1.png)
- 5. Add the remote repo and name it, then use [-v] to check the detail 
```shell
   git remote add origin [URL]
   git remote -v
```
```
   ATTENTION!!! always use origin as the name of repo
```
![img_2.png](./png/img_2.png)
- 6. Get the remote repo information and check the branch
```shell
    git fetch origin
    git branch -a
```
![img_3.png](./png/img_3.png)
- 7. Make a tracking branch as prepare work
```shell
    git branch -u origin/master master 
    
    ---the first param is remote while the second is local---
```
```shell
    git branch -vv      [check the tracking information]
```
- 8. Then pull the repo to update branch
```shell
    git pull --allow-unrelated-histories
```
![img_4.png](./png/img_4.png)
- 9. At last directly push the commit the remote repo (Since tracking has been set in step 7)
```shell
    git push
```
![img_5.png](./png/img_5.png)
- 10. 🤩 It can be checked on the repo commit column

![img_6.png](./png/img_6.png)
## 🔴Part 2. Clone from remote repo and build cooperation
- 1. Creat a directory and name it anything you want
- 2. Enter the cmd window and run this command
```shell
    git clone [URL]
```
It will creat a .git directory with git configure in secret, and initialize it at the same time
- 3. Then the repo can be successfully download
## 🔴Part 3. Some useful tips about git
### 1. The operation of <u>branch</u>
- 1.1 Create a new branch
```shell
    git branch [branch_name]
```
- 1.2 Switch to the branch
```shell
    git checkout [branch_name]
```
- 1.3 Create a new branch and switch to it
```shell
    git checkout -b [branch_name]
```
- 1.4 Merge the dev branch to the master branch
```shell
    git checkout master
    git merge dev
```

## 🔴🔴 Some Emergency Error
## When there is a time pushing the commit to remote repo, it will show the error like this
```shell
fatal: unable to access 'https://github.com/xxxx': 
Failed to connect to github.com port 443 after 21039 ms: 
Could not connect to server
```
### There are some solutions to solve this problem
- 1. Disable the ssl verification (not recommended)
```shell
    git config --global http.sslVerify false
```
- 2. Find the process that occupies the port 443 and kill it
```shell
    netstat -ano | findstr 443
    taskkill /F /PID [PID]
```
or batch operation
```shell
    for /f "tokens=5" %a in ('netstat -aon ^| findstr "443"') do taskkill /F /PID %a
```
