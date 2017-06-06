/* eslint-disable max-len, quote-props, quotes */
export default [
  {
    "id": "app.buttons.refresh",
    "defaultMessage": "Refresh",
  },
  {
    "id": "app.errors.badRequest",
    "defaultMessage": "The request parameters are incorrect, please check your input.",
  },
  {
    "id": "app.errors.general",
    "defaultMessage": "There is something wrong, please try again.",
  },
  {
    "id": "app.errors.invalidData",
    "defaultMessage": "The data is invalid, please try again.",
  },
  {
    "id": "app.errors.network",
    "defaultMessage": "Connection timeout, please network connection.",
  },
  {
    "id": "app.errors.notFound",
    "defaultMessage": "The requested resource not exists",
  },
  {
    "id": "app.errors.server",
    "defaultMessage": "Sorry, we've had a server error, Please refresh and try again.",
  },
  {
    "id": "app.fields.password",
    "defaultMessage": "password",
  },
  {
    "id": "app.fields.project",
    "defaultMessage": "Project",
  },
  {
    "id": "app.fields.userName",
    "defaultMessage": "username",
  },
  {
    "id": "app.menus.accountProfile",
    "defaultMessage": "Account Profile",
  },
  {
    "id": "app.menus.bugRepository",
    "defaultMessage": "Bug Repository",
  },
  {
    "id": "app.menus.dashboard",
    "defaultMessage": "Dashboard",
  },
  {
    "id": "app.menus.fileAnalysis",
    "defaultMessage": "File Analysis",
  },
  {
    "id": "app.menus.help",
    "defaultMessage": "Help",
  },
  {
    "id": "app.menus.logAnalysis",
    "defaultMessage": "Log Analysis",
  },
  {
    "id": "app.menus.settings",
    "defaultMessage": "Settings",
  },
  {
    "id": "app.menus.signout",
    "defaultMessage": "Sign out",
  },
  {
    "id": "app.menus.staticLogAnalysis",
    "defaultMessage": "Static Log Analysis",
  },
  {
    "id": "app.menus.streamLogAnalysis",
    "defaultMessage": "Stream Log Analysis",
  },
  {
    "id": "auth.buttons.signin",
    "defaultMessage": "Sign In",
  },
  {
    "id": "auth.buttons.signup",
    "defaultMessage": "Sign Up",
  },
  {
    "id": "auth.errors.loginFailure",
    "defaultMessage": "Cannot login, please check the network and try again",
  },
  {
    "id": "auth.errors.passwordRequired",
    "defaultMessage": "Password is required",
  },
  {
    "id": "auth.errors.tokenInvalid",
    "defaultMessage": "Your session has expired please login again",
  },
  {
    "id": "auth.errors.userNameRequired",
    "defaultMessage": "User name is required",
  },
  {
    "id": "auth.errors.wrongCredential",
    "defaultMessage": "Username or password is incorrect please try again",
  },
  {
    "id": "auth.hint.forgotPassword",
    "defaultMessage": "Forgot password?",
  },
  {
    "id": "auth.hint.newuser",
    "defaultMessage": "New user?",
  },
  {
    "id": "auth.hint.or",
    "defaultMessage": "or",
  },
  {
    "id": "auth.hint.userName",
    "defaultMessage": "username?",
  },
  {
    "id": "settings.alert.noProject",
    "defaultMessage": "There is no project, please create new one.",
  },
  {
    "id": "settings.menus.externalService",
    "defaultMessage": "External Service",
  },
  {
    "id": "settings.menus.projects",
    "defaultMessage": "Project Settings",
  },
  {
    "id": "settings.projectWizard.AWSCloudWatchIntro",
    "defaultMessage": "Uses the AWS API to monitor and report metric for your AWS cloud instances.",
  },
  {
    "id": "settings.projectWizard.cAdvisorAgent",
    "defaultMessage": "<p>\nEnsure cAdvisor is running on all hosts. Use the following command to check that the cadvisor container is present\n</p>\n<pre><code>sudo docker ps</code></pre>\n<p>\nOtherwise run cAdvisor using\n</p>\n<pre><code>sudo docker run\n  --volume=/:/rootfs:ro\n  --volume=/var/run:/var/run:rw\n  --volume=/sys:/sys:ro <br>\n  --volume=/var/lib/docker/:/var/lib/docker:ro\n  --publish=8080:8080\n  --detach=true\n  --name=cadvisor\n  google/cadvisor:latest\n</code></pre>\n<p>\nTo deploy agent on multiple hosts\n</p>\n<ul>\n<li>\n<p>Get the deployment script from github using the command</p>\n<pre><code>wget --no-check-certificate https://raw.githubusercontent.com/insightfinder/InsightAgent/master/deployment/deployInsightAgent.sh</code></pre>\n</li>\n<li>\n<p>and change the permissions with the command.</p>\n<pre><code>chmod 755 deployInsightAgent.sh</code></pre>\n</li>\n</ul>\n<p>\nEnsure all machines have the same login username and password.\nObtain the IP address for every machine (or host) the InsightFinder agent will be installed on.\nInclude the IP addresses of all hosts in hostlist.txt, entering one IP address per line.\nDeploy by running the following command:\n</p>\n<pre><code>./deployInsightAgent.sh -n USER_NAME_IN_HOST\n                        -i PROJECT_NAME_IN_INSIGHTFINDER\n                        -u USER_NAME_IN_INSIGHTFINDER\n                        -k LICENSE_KEY\n                        -s SAMPLING_INTERVAL_MINUTE\n                        -r REPORTING_INTERVAL_MINUTE\n                        -t AGENT_TYPE</code></pre>\n<p>\nAGENT_TYPE is *cadvisor*.\nSAMPLING_INTERVAL_MINUTE and REPORTING_INTERVAL_MINUTE should be greater than or equal to 2 if number of containers in the host is greater than 10.\nWhen the above script is run, if prompted for password, enter either the password or the name of the identity file along with file path. Example: /home/insight/.ssh/id_rsa\n</p>\n<p>\nTo get more details on the command, run\n</p>\n<pre><code>./deployInsightAgent.sh</code></pre>\n<p>\nTo undo agent deployment on multiple hosts:\nGet the script for stopping agents from github using below command:\n</p>\n<pre><code>wget --no-check-certificate https://raw.githubusercontent.com/insightfinder/InsightAgent/master/deployment/stopcron.sh</code></pre>\nand change the permissions with the command.\n<pre><code>chmod 755 stopcron.sh</code></pre>\n<p>\nInclude IP addresses of all hosts in hostlist.txt and enter one IP address per line.\nTo stop the agent run the following command\n</p>\n<pre><code>./stopcron.sh -n USER_NAME_IN_HOST -p PASSWORD</code></pre>\n<p>\nUSER_NAME_IN_HOST - username used to login into the host machines\nPASSWORD - password or name of the identity file along with path\nTo install agent on local machine\n</p>\n<p>\nUse the following command to download the insightfinder agent code.\n</p>\n<pre><code>wget --no-check-certificate https://github.com/insightfinder/InsightAgent/archive/master.tar.gz -O insightagent.tar.gz</code></pre>\n<p>\nUntar using this command.\n</p>\n<pre><code>tar -xvf insightagent.tar.gz</code></pre>\n<p>\nIn InsightAgent-master directory, run the following commands to install and use python virtual environment for insightfinder agent:\n</p>\n<pre><code>./deployment/checkpackages.sh\nsource pyenv/bin/activate</code></pre>\n<p>\nRun the below command to install agent.\n</p>\n<pre><code>./deployment/install.sh -i PROJECT_NAME -u USER_NAME -k LICENSE_KEY -s SAMPLING_INTERVAL_MINUTE -r REPORTING_INTERVAL_MINUTE -t AGENT_TYPE</code></pre>\n<p>\nAfter using the agent, use command \"deactivate\" to get out of python virtual environment.\n</p>\n</p>\nTo check raw data in host machines\nLogin into the individual host machines.\nIn the InsightAgent-master/data folder, all raw data will be stored in csv files. csv files older than 5 days are moved to /tmp folder.\nTo change the retention period, edit the InsightAgent-master/reporting_config.json and change the \"keep_file_days\" to the required value.\n</p>",
  },
  {
    "id": "settings.projectWizard.cAdvisorIntro",
    "defaultMessage": "This InsightFinder agent can be used to monitor system metrics of docker containers using cadvisor.",
  },
  {
    "id": "settings.projectWizard.GoogleCloudMonitoringIntro",
    "defaultMessage": "Uses Google Cloud APIs to monitor and report system metrics for your Google instances.'",
  },
  {
    "id": "settings.projectWizard.InsightAgentIntro",
    "defaultMessage": "<b>[TODO:] Revise ME!</b> Uses InsightAgent to monitor and report system metrics for your Google instances.",
  },
  {
    "id": "settings.projectWizard.PublicCloudIntro",
    "defaultMessage": "<b>[TODO:] Revise ME!</b> Uses public Cloud APIs to monitor and report system metrics for your Google instances.",
  },
  {
    "id": "settings.projectWizard.step1Introduction",
    "defaultMessage": "<b>[TODO]Revise needed:</b> A project is the scope of the data analyse, all data in the same project will be analyzed together. \nIf data has no relations with each others, we might add different data sources into different projects \nto improve the performance. <br>\nIf you are collaborating with other users, you may invite them to view data associated with your Projects.",
  },
  {
    "id": "settings.projectWizard.step2Introduction",
    "defaultMessage": "<b>[TODO]Revise needed:</b> Project is created, now you need to add some data sources for this project.\nYou can filter the data sources by the OS, platform or application and select the data sources you want to add. \n<br> You can skip this step and add the data sources in the project settings.",
  },
  {
    "id": "settings.projectWizard.step3Introduction",
    "defaultMessage": "<b>[TODO]Revise needed:</b> Following the precedure to config settings or install agent for all the selected data sources. \nMark it \"Completed\" if you finished the needed precedures.",
  },
  {
    "id": "settings.projectWizard.step4Introduction",
    "defaultMessage": "<b>[TODO]Revise needed:</b> Congratulation, you have setup the project. If you have added data source for this project, it might\ntake several minutes for the data source agent to work, you can check the status of the data source in the <a href=\"/settings/projects\">Project Settings</a>.",
  },
];
