/* eslint-disable max-len, quote-props, quotes */
export default [
  {
    "id": "app.buttons.refresh",
    "defaultMessage": "刷新",
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
    "id": "app.errors.noLogProject",
    "defaultMessage": "There is no log project, please go to <a href=\"/settings/project-list\">Settings</a> to register one.",
  },
  {
    "id": "app.errors.noMetricProject",
    "defaultMessage": "There is no metric project, please go to <a href=\"/settings/project-list\">Settings</a> to register one.",
  },
  {
    "id": "app.errors.notFound",
    "defaultMessage": "The requested resource not exists",
  },
  {
    "id": "app.errors.projectNotFound",
    "defaultMessage": "The project <b>{projectName}</b> doesn' exists. Please choose the project to view.",
  },
  {
    "id": "app.errors.server",
    "defaultMessage": "Sorry, we've had a server error, Please try again.",
  },
  {
    "id": "app.fields.password",
    "defaultMessage": "密码",
  },
  {
    "id": "app.fields.project",
    "defaultMessage": "项目",
  },
  {
    "id": "app.fields.userName",
    "defaultMessage": "用户名",
  },
  {
    "id": "app.menus.accountProfile",
    "defaultMessage": "账户信息",
  },
  {
    "id": "app.menus.bugRepository",
    "defaultMessage": "缺陷仓库",
  },
  {
    "id": "app.menus.dashboard",
    "defaultMessage": "仪表板",
  },
  {
    "id": "app.menus.fileAnalysis",
    "defaultMessage": "文件分析",
  },
  {
    "id": "app.menus.help",
    "defaultMessage": "帮助",
  },
  {
    "id": "app.menus.historicalLogAnalysis",
    "defaultMessage": "Historical Log Analysis",
  },
  {
    "id": "app.menus.historicalMetricAnalysis",
    "defaultMessage": "Historical Metric Analysis",
  },
  {
    "id": "app.menus.issues",
    "defaultMessage": "Issues",
  },
  {
    "id": "app.menus.logAnalysis",
    "defaultMessage": "日志分析",
  },
  {
    "id": "app.menus.metricAnalysis",
    "defaultMessage": "Metric Analysis",
  },
  {
    "id": "app.menus.settings",
    "defaultMessage": "设置",
  },
  {
    "id": "app.menus.signout",
    "defaultMessage": "登  出",
  },
  {
    "id": "app.menus.staticLogAnalysis",
    "defaultMessage": "静态日志分析",
  },
  {
    "id": "app.menus.streamLogAnalysis",
    "defaultMessage": "Stream Log Analysis",
  },
  {
    "id": "auth.buttons.signin",
    "defaultMessage": "登  录",
  },
  {
    "id": "auth.buttons.signup",
    "defaultMessage": "注  册",
  },
  {
    "id": "auth.errors.loginFailure",
    "defaultMessage": "登录失败，请检查网络后重试",
  },
  {
    "id": "auth.errors.passwordRequired",
    "defaultMessage": "密码不能为空",
  },
  {
    "id": "auth.errors.tokenInvalid",
    "defaultMessage": "登录信息过期，请重新登录",
  },
  {
    "id": "auth.errors.userNameRequired",
    "defaultMessage": "用户名不能为空",
  },
  {
    "id": "auth.errors.wrongCredential",
    "defaultMessage": "用户名或密码错误，请重试",
  },
  {
    "id": "auth.hint.forgotPassword",
    "defaultMessage": "忘记密码？",
  },
  {
    "id": "auth.hint.newuser",
    "defaultMessage": "新用户？",
  },
  {
    "id": "auth.hint.or",
    "defaultMessage": "或",
  },
  {
    "id": "auth.hint.userName",
    "defaultMessage": "用户名?",
  },
  {
    "id": "settings.alert.noProject",
    "defaultMessage": "There is no project, please create new one.",
  },
  {
    "id": "settings.error.emptyInput",
    "defaultMessage": "This setting cannot be empty, please input value.",
  },
  {
    "id": "settings.error.emptySelection",
    "defaultMessage": "This setting cannot be empty, please select from options.",
  },
  {
    "id": "settings.error.noProjectModel",
    "defaultMessage": "There is no model found for <b>{projectName}</b>, please change start/end date or choose other groups.",
  },
  {
    "id": "settings.error.notNumberInput",
    "defaultMessage": "This setting value is invalid, please input number value.",
  },
  {
    "id": "settings.info.projectlRemoved",
    "defaultMessage": "The project is removed",
  },
  {
    "id": "settings.info.projectModelPicked",
    "defaultMessage": "The project model is picked",
  },
  {
    "id": "settings.info.projectModelRemoved",
    "defaultMessage": "The project model is removed",
  },
  {
    "id": "settings.info.projectSettingSaved",
    "defaultMessage": "The setting is saved",
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
    "defaultMessage": "<b>[TODO]Revise needed:</b> <b>AWS CloudWatch</b> uses the API provided by AWS to collect metric.",
  },
  {
    "id": "settings.projectWizard.cAdvisorAgent",
    "defaultMessage": "Ensure cAdvisor is running on all hosts. Use the following command to check that the cadvisor container is present\n\nsudo docker ps\nOtherwise run cAdvisor using\n\nsudo docker run   --volume=/:/rootfs:ro   --volume=/var/run:/var/run:rw   --volume=/sys:/sys:ro   --volume=/var/lib/docker/:/var/lib/docker:ro   --publish=8080:8080   --detach=true   --name=cadvisor   google/cadvisor:latest\nTo deploy agent on multiple hosts\n\nGet the deployment script from github using the command\nwget --no-check-certificate https://raw.githubusercontent.com/insightfinder/InsightAgent/master/deployment/deployInsightAgent.sh\nand change the permissions with the command.\n\n chmod 755 deployInsightAgent.sh \nEnsure all machines have the same login username and password.\nObtain the IP address for every machine (or host) the InsightFinder agent will be installed on.\nInclude the IP addresses of all hosts in hostlist.txt, entering one IP address per line.\nDeploy by running the following command:\n./deployInsightAgent.sh -n USER_NAME_IN_HOST\n                        -i PROJECT_NAME_IN_INSIGHTFINDER\n                        -u USER_NAME_IN_INSIGHTFINDER\n                        -k LICENSE_KEY\n                        -s SAMPLING_INTERVAL_MINUTE\n                        -r REPORTING_INTERVAL_MINUTE\n                        -t AGENT_TYPE\nAGENT_TYPE is *cadvisor*.\nSAMPLING_INTERVAL_MINUTE and REPORTING_INTERVAL_MINUTE should be greater than or equal to 2 if number of containers in the host is greater than 10.\nWhen the above script is run, if prompted for password, enter either the password or the name of the identity file along with file path. Example: /home/insight/.ssh/id_rsa\nTo get more details on the command, run\n\n./deployInsightAgent.sh\nTo undo agent deployment on multiple hosts:\n\nGet the script for stopping agents from github using below command:\nwget --no-check-certificate https://raw.githubusercontent.com/insightfinder/InsightAgent/master/deployment/stopcron.sh\nand change the permissions with the command.\n\n chmod 755 stopcron.sh\nInclude IP addresses of all hosts in hostlist.txt and enter one IP address per line.\nTo stop the agent run the following command\n./stopcron.sh -n USER_NAME_IN_HOST -p PASSWORD\n\nUSER_NAME_IN_HOST - username used to login into the host machines\nPASSWORD - password or name of the identity file along with path\nTo install agent on local machine\n\nUse the following command to download the insightfinder agent code.\nwget --no-check-certificate https://github.com/insightfinder/InsightAgent/archive/master.tar.gz -O insightagent.tar.gz\nUntar using this command.\n\ntar -xvf insightagent.tar.gz\nIn InsightAgent-master directory, run the following commands to install and use python virtual environment for insightfinder agent:\n./deployment/checkpackages.sh\nsource pyenv/bin/activate\nRun the below command to install agent.\n./deployment/install.sh -i PROJECT_NAME -u USER_NAME -k LICENSE_KEY -s SAMPLING_INTERVAL_MINUTE -r REPORTING_INTERVAL_MINUTE -t AGENT_TYPE\nAfter using the agent, use command \"deactivate\" to get out of python virtual environment.\n\nTo check raw data in host machines\n\nLogin into the individual host machines.\nIn the InsightAgent-master/data folder, all raw data will be stored in csv files. csv files older than 5 days are moved to /tmp folder.\nTo change the retention period, edit the InsightAgent-master/reporting_config.json and change the \"keep_file_days\" to the required value.",
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
    "id": "settings.projectWizard.PublicDataDogIntro",
    "defaultMessage": "Uses DataDog APIs to monitor and report system metrics for your instances.",
  },
  {
    "id": "settings.projectWizard.PublicNewRelicIntro",
    "defaultMessage": "Uses New Relic APIs to monitor and report system metrics for your instances.",
  },
  {
    "id": "settings.projectWizard.step1Introduction",
    "defaultMessage": "A project is the scope of the data analyse, all data in the same project will be analyzed together. If data has no relations\nwith each others, we might add different data sources into different projects to improve the performance. <br/>\nIf you are collaborating with other users, you may invite them to view data associated with your Projects. <b>TODO: Revise</b>",
  },
  {
    "id": "settings.projectWizard.step2Introduction",
    "defaultMessage": "Project can have multiple data sources. In the wizard, we only create \nthe first one. To add more data source, go to project settings. You can also skip \nthis step and create it later. <b>[TODO]</b>",
  },
  {
    "id": "settings.projectWizard.step3Introduction",
    "defaultMessage": "<b>[TODO]Revise needed:</b> Please following the precedure to config settings or install agent for each data sources.",
  },
  {
    "id": "settings.projectWizard.step4Introduction",
    "defaultMessage": "<b>[TODO]Revise needed:</b> Congratulation, you have setup the project. If you have added data source for this project, it might\ntake several minutes for the data source agent to work, you can check the status of the data source in the <a href=\"\">Project Settings</a>.",
  },
  {
    "id": "settings.warn.projectModelNotExists",
    "defaultMessage": "The project model not exists, please select another one",
  },
];
