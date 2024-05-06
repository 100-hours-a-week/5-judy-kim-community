# git-sch

GitRep1="Kakao-Cloud-School"
GitRep2="100-hours-a-week/5-judy-kim-community"

HomeDir="/Users/kimsohui"
WorkDir="$HomeDir/kakao/kakao HW"

cd $WorkDir
git add .
git commit -m "update $(date)"
git push

cd $HomeDir/$GitRep1
git pull
git push

cd $HomeDir/$GitRep2
git pull
git push
