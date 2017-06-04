/* @flow */

import { defineMessages } from 'react-intl';

const step1Introduction = `
<b>[TODO]Revise needed:</b> A project is the scope of the data analyse, all data in the same project will be analyzed together. 
If data has no relations with each others, we might add different data sources into different projects 
to improve the performance. <br>
If you are collaborating with other users, you may invite them to view data associated with your Projects.
`;

const step2Introduction = `
<b>[TODO]Revise needed:</b> Project is created, now you need to add some data sources for this project.
You can filter the data sources by the OS, platform or application and select the data sources you want to add. 
<br> You can skip this step and add the data sources in the project settings.
`;

const step3Introduction = `
<b>[TODO]Revise needed:</b> Following the precedure to config settings or install agent for all the selected data sources. 
Mark it "Completed" if you finished the needed precedures.
`;

const step4Introduction = `
<b>[TODO]Revise needed:</b> Congratulation, you have setup the project. If you have added data source for this project, it might
take several minutes for the data source agent to work, you can check the status of the data source in the <a href="/settings/projects">Project Settings</a>.
`;

const PublicCloudIntro = `
<b>[TODO:] Revise ME!</b> Uses public Cloud APIs to monitor and report system metrics for your Google instances.
`;

const InsightAgentIntro = `
<b>[TODO:] Revise ME!</b> Uses InsightAgent to monitor and report system metrics for your Google instances.
`;

const AWSCloudWatchIntro = `
Uses the AWS API to monitor and report metric for your AWS cloud instances.
`;

const GoogleCloudMonitoringIntro = `
Uses Google Cloud APIs to monitor and report system metrics for your Google instances.'
`;

const cAdvisorIntro = `
This InsightFinder agent can be used to monitor system metrics of docker containers using cadvisor.
`;

const cAdvisorAgent = `
Ensure cAdvisor is running on all hosts. Use the following command to check that the cadvisor container is present

<div class="code">
sudo docker ps
</div>
Otherwise run cAdvisor using

<div class="code">
sudo docker run <br>
  --volume=/:/rootfs:ro <br>
  --volume=/var/run:/var/run:rw <br>
  --volume=/sys:/sys:ro <br>
  --volume=/var/lib/docker/:/var/lib/docker:ro <br>
  --publish=8080:8080 <br>
  --detach=true <br>
  --name=cadvisor <br>
  google/cadvisor:latest

<h5>To deploy agent on multiple hosts</h5>

<li>Get the deployment script from github using the command</li>
<div class="code">
wget --no-check-certificate https://raw.githubusercontent.com/insightfinder/InsightAgent/master/deployment/deployInsightAgent.sh
</div>
<li>and change the permissions with the command.</li>

<div class="code">
 chmod 755 deployInsightAgent.sh 
</div>
Ensure all machines have the same login username and password.
Obtain the IP address for every machine (or host) the InsightFinder agent will be installed on.
Include the IP addresses of all hosts in hostlist.txt, entering one IP address per line.
Deploy by running the following command:
./deployInsightAgent.sh -n USER_NAME_IN_HOST
                        -i PROJECT_NAME_IN_INSIGHTFINDER
                        -u USER_NAME_IN_INSIGHTFINDER
                        -k LICENSE_KEY
                        -s SAMPLING_INTERVAL_MINUTE
                        -r REPORTING_INTERVAL_MINUTE
                        -t AGENT_TYPE
AGENT_TYPE is *cadvisor*.
SAMPLING_INTERVAL_MINUTE and REPORTING_INTERVAL_MINUTE should be greater than or equal to 2 if number of containers in the host is greater than 10.
When the above script is run, if prompted for password, enter either the password or the name of the identity file along with file path. Example: /home/insight/.ssh/id_rsa
To get more details on the command, run

./deployInsightAgent.sh
To undo agent deployment on multiple hosts:

Get the script for stopping agents from github using below command:
wget --no-check-certificate https://raw.githubusercontent.com/insightfinder/InsightAgent/master/deployment/stopcron.sh
and change the permissions with the command.

 chmod 755 stopcron.sh
Include IP addresses of all hosts in hostlist.txt and enter one IP address per line.
To stop the agent run the following command
./stopcron.sh -n USER_NAME_IN_HOST -p PASSWORD

USER_NAME_IN_HOST - username used to login into the host machines
PASSWORD - password or name of the identity file along with path
To install agent on local machine

Use the following command to download the insightfinder agent code.
wget --no-check-certificate https://github.com/insightfinder/InsightAgent/archive/master.tar.gz -O insightagent.tar.gz
Untar using this command.

tar -xvf insightagent.tar.gz
In InsightAgent-master directory, run the following commands to install and use python virtual environment for insightfinder agent:
./deployment/checkpackages.sh
source pyenv/bin/activate
Run the below command to install agent.
./deployment/install.sh -i PROJECT_NAME -u USER_NAME -k LICENSE_KEY -s SAMPLING_INTERVAL_MINUTE -r REPORTING_INTERVAL_MINUTE -t AGENT_TYPE
After using the agent, use command "deactivate" to get out of python virtual environment.

To check raw data in host machines

Login into the individual host machines.
In the InsightAgent-master/data folder, all raw data will be stored in csv files. csv files older than 5 days are moved to /tmp folder.
To change the retention period, edit the InsightAgent-master/reporting_config.json and change the "keep_file_days" to the required value.
`;

const projectWizardMessages = defineMessages({
  step1Introduction: {
    defaultMessage: step1Introduction,
    id: 'settings.projectWizard.step1Introduction',
  },
  step2Introduction: {
    defaultMessage: step2Introduction,
    id: 'settings.projectWizard.step2Introduction',
  },
  step3Introduction: {
    defaultMessage: step3Introduction,
    id: 'settings.projectWizard.step3Introduction',
  },
  step4Introduction: {
    defaultMessage: step4Introduction,
    id: 'settings.projectWizard.step4Introduction',
  },
  PublicCloudIntro: {
    defaultMessage: PublicCloudIntro,
    id: 'settings.projectWizard.PublicCloudIntro',
  },
  InsightAgentIntro: {
    defaultMessage: InsightAgentIntro,
    id: 'settings.projectWizard.InsightAgentIntro',
  },
  AWSCloudWatchIntro: {
    defaultMessage: AWSCloudWatchIntro,
    id: 'settings.projectWizard.AWSCloudWatchIntro',
  },
  GoogleCloudMonitoringIntro: {
    defaultMessage: GoogleCloudMonitoringIntro,
    id: 'settings.projectWizard.GoogleCloudMonitoringIntro',
  },
  cAdvisorIntro: {
    defaultMessage: cAdvisorIntro,
    id: 'settings.projectWizard.cAdvisorIntro',
  },
  cAdvisorAgent: {
    defaultMessage: cAdvisorAgent,
    id: 'settings.projectWizard.cAdvisorAgent',
  },
});

export default projectWizardMessages;
