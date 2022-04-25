"use strict";(self.webpackChunkdocus=self.webpackChunkdocus||[]).push([[9727],{16635:function(t,e,a){a.r(e),a.d(e,{frontMatter:function(){return r},contentTitle:function(){return s},metadata:function(){return c},assets:function(){return d},toc:function(){return p},default:function(){return h}});var n=a(87462),o=a(63366),i=(a(67294),a(3905)),l=["components"],r={title:"\u25b6\ufe0f  Use TiDB Cloud to Analyze GitHub Events in 5 Minutes"},s=void 0,c={permalink:"/blog/try-it-yourself",editUrl:"https://github.com/pingcap/ossinsight/edit/main/blog/try-it-yourself.md",source:"@site/blog/try-it-yourself.md",title:"\u25b6\ufe0f  Use TiDB Cloud to Analyze GitHub Events in 5 Minutes",description:"TiDB is an open source distributed NewSQL database with horizontal scalability, high availability, and strong consistency. It can also deal with mixed OLTP and OLAP workloads at the same time by leveraging its hybrid transactional and analytical (HTAP) capability.",date:"2022-04-25T05:46:30.363Z",formattedDate:"April 25, 2022",tags:[],readingTime:4.66,truncated:!1,authors:[],prevItem:{title:"Data Preparation for Analytics",permalink:"/blog/how-it-works"},nextItem:{title:"Build a Real-time Analytics Dashboard in Logistics Industry with Metabase",permalink:"/blog/build-a-real-time-analytics-dashboard-in-metabase"}},d={authorsImageUrls:[]},p=[{value:"Sign up for a TiDB Cloud account (Free)",id:"sign-up-for-a-tidb-cloud-account-free",children:[],level:2},{value:"Create a TiDB Developer Tier cluster (Free)",id:"create-a-tidb-developer-tier-cluster-free",children:[],level:2},{value:"Import data to your TiDB Cloud cluster",id:"import-data-to-your-tidb-cloud-cluster",children:[{value:"Import the data",id:"import-the-data",children:[],level:3},{value:"Use the web shell to check if data is ready",id:"use-the-web-shell-to-check-if-data-is-ready",children:[],level:3},{value:"Set column storage replica: TiFlash (Optional)",id:"set-column-storage-replica-tiflash-optional",children:[],level:3}],level:2},{value:"Analysis!",id:"analysis",children:[{value:"How many events occurred in total?",id:"how-many-events-occurred-in-total",children:[],level:3},{value:"Which repository gets the most stars?",id:"which-repository-gets-the-most-stars",children:[],level:3}],level:2},{value:"Mini Test",id:"mini-test",children:[{value:"Q: Who is the most active contributor except the robot accounts on the first hour of 2022?",id:"q-who-is-the-most-active-contributor-except-the-robot-accounts-on-the-first-hour-of-2022",children:[],level:3},{value:"Click for the answer. \u2b07\ufe0f",id:"click-for-the-answer-\ufe0f",children:[],level:3}],level:2},{value:"Watch the video below for detailed information",id:"watch-the-video-below-for-detailed-information",children:[],level:2}],u={toc:p};function h(t){var e=t.components,r=(0,o.Z)(t,l);return(0,i.kt)("wrapper",(0,n.Z)({},u,r,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://docs.pingcap.com/tidb/stable/overview?utm_source=ossinsight"},"TiDB")," is an open source distributed NewSQL database with horizontal scalability, high availability, and strong consistency. It can also deal with mixed OLTP and OLAP workloads at the same time by leveraging its hybrid transactional and analytical (HTAP) capability. "),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("a",{parentName:"strong",href:"https://docs.pingcap.com/tidbcloud/public-preview?utm_source=ossinsight"},"TiDB Cloud")," is a fully-managed Database-as-a-Service (DBaaS)")," that brings everything great about TiDB to your cloud and lets you focus on your applications, not the complexities of your database. "),(0,i.kt)("p",null,"In this tutorial, we will provide you with a piece of sample data of all GitHub events occurring on January 1, 2022, and walk you through on how to use TiDB Cloud to analyze this data in 5 minutes.  "),(0,i.kt)("h2",{id:"sign-up-for-a-tidb-cloud-account-free"},"Sign up for a TiDB Cloud account (Free)"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Click ",(0,i.kt)("a",{parentName:"li",href:"https://tidbcloud.com/signup?utm_source=ossinsight"},"here")," to sign up for a TiDB Cloud account free of charge. "),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"https://tidbcloud.com/?utm_source=ossinsight"},"Log in")," to your account.")),(0,i.kt)("h2",{id:"create-a-tidb-developer-tier-cluster-free"},"Create a TiDB Developer Tier cluster (Free)"),(0,i.kt)("p",null,"Once you register an account, you can create a free cluster with TiDB Developer Tier. "),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"}," A cluster is a database to store data. "))),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Click ",(0,i.kt)("strong",{parentName:"li"},"Get Started for Free")," and start to create a free cluster. ")),(0,i.kt)("p",null,(0,i.kt)("img",{src:a(59377).Z})),(0,i.kt)("ol",{start:2},(0,i.kt)("li",{parentName:"ol"},"On the ",(0,i.kt)("strong",{parentName:"li"},"Create a Cluster")," page, set up your cluster name and root password."),(0,i.kt)("li",{parentName:"ol"},"Note that the cloud provider is AWS by default, and then select the ",(0,i.kt)("inlineCode",{parentName:"li"},"US-West-2 (Oregon)")," region to create the cluster."),(0,i.kt)("li",{parentName:"ol"},"The cluster tier is S1.dev by default."),(0,i.kt)("li",{parentName:"ol"},"Click ",(0,i.kt)("strong",{parentName:"li"},"Submit"),".\nYour TiDB Cloud cluster will be created in approximately 5 to 10 minutes.")),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"The Developer Tier is ",(0,i.kt)("strong",{parentName:"p"},"free")," for 1 year."))),(0,i.kt)("h2",{id:"import-data-to-your-tidb-cloud-cluster"},"Import data to your TiDB Cloud cluster"),(0,i.kt)("h3",{id:"import-the-data"},"Import the data"),(0,i.kt)("p",null,"Once your cluster is ready, you can start to import the sample data to your cluster. "),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"We have merged the create database/table in the SQL files, so you don't need to ",(0,i.kt)("inlineCode",{parentName:"p"},"create database/tables")," by yourself."),(0,i.kt)("p",{parentName:"div"},"If you want to know the table schema, you can check ",(0,i.kt)("inlineCode",{parentName:"p"},"desc gharchive_dev")," later in the following step. "))),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Click the ",(0,i.kt)("strong",{parentName:"li"},"Import")," button on the ",(0,i.kt)("strong",{parentName:"li"},"Active Clusters")," page and then go to the ",(0,i.kt)("strong",{parentName:"li"},"Data Import Task")," page. ")),(0,i.kt)("p",null,(0,i.kt)("img",{src:a(36983).Z})),(0,i.kt)("ol",{start:2},(0,i.kt)("li",{parentName:"ol"},"Copy the values below and paste to the blanks of ",(0,i.kt)("strong",{parentName:"li"},"Bucket URL")," and ",(0,i.kt)("strong",{parentName:"li"},"Role-ARN")," respectively on the ",(0,i.kt)("strong",{parentName:"li"},"Data Import Task")," page.")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Bucket URL"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"s3://tidbcloud-samples/gharchive/\n")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Role-ARN"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"arn:aws:iam::385595570414:role/import-sample-access\n")),(0,i.kt)("ol",{start:3},(0,i.kt)("li",{parentName:"ol"},"Choose ",(0,i.kt)("strong",{parentName:"li"},"US West (Oregon)")," for your ",(0,i.kt)("strong",{parentName:"li"},"Bucket region"),";"),(0,i.kt)("li",{parentName:"ol"},"Tick ",(0,i.kt)("strong",{parentName:"li"},"TiDB Dumpling")," for the ",(0,i.kt)("strong",{parentName:"li"},"Data Format"),". "),(0,i.kt)("li",{parentName:"ol"},"Input your cluster password in the blank of Password on the ",(0,i.kt)("strong",{parentName:"li"},"Target Database")," section. ")),(0,i.kt)("p",null,(0,i.kt)("img",{src:a(37438).Z})),(0,i.kt)("ol",{start:6},(0,i.kt)("li",{parentName:"ol"},"After you fill in all the blanks on the ",(0,i.kt)("strong",{parentName:"li"},"Data Import Task")," page, click the ",(0,i.kt)("strong",{parentName:"li"},"Import")," button at the bottom of this page and wait for a few moments for the system to complete data importing. ")),(0,i.kt)("h3",{id:"use-the-web-shell-to-check-if-data-is-ready"},"Use the web shell to check if data is ready"),(0,i.kt)("p",null,"TiDB Cloud provides a web shell to connect the database online. "),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Click the ",(0,i.kt)("strong",{parentName:"li"},"Exit")," button after you successfully import the data into your cluster. "),(0,i.kt)("li",{parentName:"ol"},"Then, click the ",(0,i.kt)("strong",{parentName:"li"},"Connect")," button and the ",(0,i.kt)("strong",{parentName:"li"},"Connect to TiDB")," panel pops out. "),(0,i.kt)("li",{parentName:"ol"},"Choose ",(0,i.kt)("strong",{parentName:"li"},"Web SQL Shell")," --\x3e ",(0,i.kt)("strong",{parentName:"li"},"Open SQL Shell"),". "),(0,i.kt)("li",{parentName:"ol"},"Then input your cluster password as shown in the image below.")),(0,i.kt)("p",null,(0,i.kt)("img",{src:a(94247).Z})),(0,i.kt)("h3",{id:"set-column-storage-replica-tiflash-optional"},"Set column storage replica: TiFlash (Optional)"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://docs.pingcap.com/tidb/stable/tiflash-overview?utm_source=ossinsight"},"TiFlash")," is the key component that makes TiDB / TiDB Cloud an HTAP database and capable of dealing with OLTP and OLAP workloads at the same time. "),(0,i.kt)("p",null,"Here, you can try the following SQL commands on TiDB Cloud to experience its real-time analytics with ease."),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Execute the SQL statements specified below ")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"use gharchive_dev;\nALTER TABLE github_events SET TIFLASH REPLICA 1;\n")),(0,i.kt)("ol",{start:2},(0,i.kt)("li",{parentName:"ol"},"Setting a TiFlash replica will take you some time, so you can use the following SQL statements to check if the procedure is done or not. ")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT * FROM information_schema.tiflash_replica WHERE TABLE_SCHEMA = 'gharchive_dev' and TABLE_NAME = 'github_events';\n")),(0,i.kt)("p",null,"If the results you get are the same as follows, then it means the procedure is done. "),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"mysql> SELECT * FROM information_schema.tiflash_replica WHERE TABLE_SCHEMA = 'gharchive_dev' and TABLE_NAME = 'github_events';\n+---------------+---------------+----------+---------------+-----------------+-----------+----------+\n| TABLE_SCHEMA  | TABLE_NAME    | TABLE_ID | REPLICA_COUNT | LOCATION_LABELS | AVAILABLE | PROGRESS |\n+---------------+---------------+----------+---------------+-----------------+-----------+----------+\n| gharchive_dev | github_events |       68 |             1 |                 |         1 |        1 |\n+---------------+---------------+----------+---------------+-----------------+-----------+----------+\n1 row in set (0.27 sec)\n\nmysql>\n")),(0,i.kt)("h2",{id:"analysis"},"Analysis!"),(0,i.kt)("p",null,"After you finish all the steps above, you can start the analytical process. "),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"If you want to know the table schema, you can use ",(0,i.kt)("inlineCode",{parentName:"p"},"show create table tbl_name")," to get that information."))),(0,i.kt)("p",null,"Because you have imported the sample data of all GitHub events occurred on the first hour of 2022 (from 2022-01-01 00:00:00 to 2022-01-01 00:59:59), you can start to make any queries based on that data by using SQL commands. "),(0,i.kt)("h3",{id:"how-many-events-occurred-in-total"},"How many events occurred in total?"),(0,i.kt)("p",null,"Execute the following SQL statement to query the total number of events. "),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT count(*) FROM github_events;\n")),(0,i.kt)("h3",{id:"which-repository-gets-the-most-stars"},"Which repository gets the most stars?"),(0,i.kt)("p",null,"Execute the following statements to query the most starred repository. "),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"  SELECT repo_name, count(*) AS events_count\n    FROM github_events\n   WHERE type = 'WatchEvent' /* Yes, `WatchEvent` means star */\nGROUP BY 1\nORDER BY 2 DESC\n   LIMIT 20;\n")),(0,i.kt)("h2",{id:"mini-test"},"Mini Test"),(0,i.kt)("p",null,"Here is a small test for you to practice how to use TiDB Cloud to conduct analytics. "),(0,i.kt)("h3",{id:"q-who-is-the-most-active-contributor-except-the-robot-accounts-on-the-first-hour-of-2022"},"Q: Who is the most active contributor except the robot accounts on the first hour of 2022?"),(0,i.kt)("h3",{id:"click-for-the-answer-\ufe0f"},"Click for the answer. \u2b07\ufe0f"),(0,i.kt)("details",null,(0,i.kt)("summary",null,"Click me to show answer"),(0,i.kt)("p",null,(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"  SELECT actor_login, \n         count(*) AS events_count\n    FROM github_events\n   WHERE actor_login NOT LIKE '%bot%'\nGROUP BY 1\nORDER BY 2 DESC \n   LIMIT 20\n")))),(0,i.kt)("h2",{id:"watch-the-video-below-for-detailed-information"},"Watch the video below for detailed information"),(0,i.kt)("video",{width:"100%",poster:"/img/try-it-yourself/dev-tier.png",controls:!0},(0,i.kt)("source",{src:"/video/github-demo-tidbcloud.mp4",type:"video/mp4"})))}h.isMDXComponent=!0},59377:function(t,e,a){e.Z=a.p+"assets/images/dev-tier-5c6c7947591b242e9633e7383ee0dea4.png"},37438:function(t,e,a){e.Z=a.p+"assets/images/fill-696a43b3bd3bdc5abfdeb8d09b8e0cb9.png"},36983:function(t,e,a){e.Z=a.p+"assets/images/import-250de00cd973328ea129772e5e669ca4.png"},94247:function(t,e,a){e.Z=a.p+"assets/images/web-shell-b6af3389f0b6a23cbc0a0c7169b03b9c.png"}}]);