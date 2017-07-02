/* @flow */

import { defineMessages } from 'react-intl';

const step1Introduction = `
A project is the scope of the data analyse, all data in the same project will be analyzed together. 
If data has no relations with each others, we might add different data sources into different projects 
to improve the performance.
`;

const step2Introduction = `
Please select the data source for this project.
You can filter the data sources by the OS, platform or application and select the data sources you want to add. 
`;

const step3Introduction = `
Following the precedure to config settings or install agent for the selected data sources.
`;

const step4Introduction = `
Congratulation, you have setup the project. It might take several minutes for the data source agent to work, 
you can check the status of the data source in the <a href="/settings/projects">Project Settings</a>.
`;

const PublicCloudIntro = `
Uses public Cloud APIs to monitor and report system metrics for your instances.
`;

const PublicDataDogIntro = `
Uses DataDog APIs to monitor and report system metrics for your instances.
`;

const PublicNewRelicIntro = `
Uses New Relic APIs to monitor and report system metrics for your instances.
`;

const InsightAgentIntro = `
Uses <b>InsightAgent</b> to monitor and report system metrics for your instances. For details, please visit 
<a href="https://github.com/insightfinder/InsightAgent" target="_blank">https://github.com/insightfinder/InsightAgent</a>.
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
<p>
Ensure cAdvisor is running on all hosts. Use the following command to check that the cadvisor container is present
</p>
<pre><code>sudo docker ps</code></pre>
<p>
Otherwise run cAdvisor using
</p>
<pre><code>sudo docker run
  --volume=/:/rootfs:ro
  --volume=/var/run:/var/run:rw
  --volume=/sys:/sys:ro <br>
  --volume=/var/lib/docker/:/var/lib/docker:ro
  --publish=8080:8080
  --detach=true
  --name=cadvisor
  google/cadvisor:latest
</code></pre>
<p>
To deploy agent on multiple hosts
</p>
<ul>
<li>
<p>Get the deployment script from github using the command</p>
<pre><code>wget --no-check-certificate https://raw.githubusercontent.com/insightfinder/InsightAgent/master/deployment/deployInsightAgent.sh</code></pre>
</li>
<li>
<p>and change the permissions with the command.</p>
<pre><code>chmod 755 deployInsightAgent.sh</code></pre>
</li>
</ul>
<p>
Ensure all machines have the same login username and password.
Obtain the IP address for every machine (or host) the InsightFinder agent will be installed on.
Include the IP addresses of all hosts in hostlist.txt, entering one IP address per line.
Deploy by running the following command:
</p>
<pre><code>./deployInsightAgent.sh -n USER_NAME_IN_HOST
                        -i PROJECT_NAME_IN_INSIGHTFINDER
                        -u USER_NAME_IN_INSIGHTFINDER
                        -k LICENSE_KEY
                        -s SAMPLING_INTERVAL_MINUTE
                        -r REPORTING_INTERVAL_MINUTE
                        -t AGENT_TYPE</code></pre>
<p>
AGENT_TYPE is *cadvisor*.
SAMPLING_INTERVAL_MINUTE and REPORTING_INTERVAL_MINUTE should be greater than or equal to 2 if number of containers in the host is greater than 10.
When the above script is run, if prompted for password, enter either the password or the name of the identity file along with file path. Example: /home/insight/.ssh/id_rsa
</p>
<p>
To get more details on the command, run
</p>
<pre><code>./deployInsightAgent.sh</code></pre>
<p>
To undo agent deployment on multiple hosts:
Get the script for stopping agents from github using below command:
</p>
<pre><code>wget --no-check-certificate https://raw.githubusercontent.com/insightfinder/InsightAgent/master/deployment/stopcron.sh</code></pre>
and change the permissions with the command.
<pre><code>chmod 755 stopcron.sh</code></pre>
<p>
Include IP addresses of all hosts in hostlist.txt and enter one IP address per line.
To stop the agent run the following command
</p>
<pre><code>./stopcron.sh -n USER_NAME_IN_HOST -p PASSWORD</code></pre>
<p>
USER_NAME_IN_HOST - username used to login into the host machines
PASSWORD - password or name of the identity file along with path
To install agent on local machine
</p>
<p>
Use the following command to download the insightfinder agent code.
</p>
<pre><code>wget --no-check-certificate https://github.com/insightfinder/InsightAgent/archive/master.tar.gz -O insightagent.tar.gz</code></pre>
<p>
Untar using this command.
</p>
<pre><code>tar -xvf insightagent.tar.gz</code></pre>
<p>
In InsightAgent-master directory, run the following commands to install and use python virtual environment for insightfinder agent:
</p>
<pre><code>./deployment/checkpackages.sh
source pyenv/bin/activate</code></pre>
<p>
Run the below command to install agent.
</p>
<pre><code>./deployment/install.sh -i PROJECT_NAME -u USER_NAME -k LICENSE_KEY -s SAMPLING_INTERVAL_MINUTE -r REPORTING_INTERVAL_MINUTE -t AGENT_TYPE</code></pre>
<p>
After using the agent, use command "deactivate" to get out of python virtual environment.
</p>
</p>
To check raw data in host machines
Login into the individual host machines.
In the InsightAgent-master/data folder, all raw data will be stored in csv files. csv files older than 5 days are moved to /tmp folder.
To change the retention period, edit the InsightAgent-master/reporting_config.json and change the "keep_file_days" to the required value.
</p>
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
  PublicDataDogIntro: {
    defaultMessage: PublicDataDogIntro,
    id: 'settings.projectWizard.PublicDataDogIntro',
  },
  PublicNewRelicIntro: {
    defaultMessage: PublicNewRelicIntro,
    id: 'settings.projectWizard.PublicNewRelicIntro',
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
