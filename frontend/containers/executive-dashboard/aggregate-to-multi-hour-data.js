const aggregateToMultiHourData = (jsonResponse, durationInDays = 7, periodInHours = 3, endTimestamp) => {

  // Make sure data isn't an empty array
  if (jsonResponse === {}){
	  jsonResponse = {"data":{"ALGN-PRD@ebrown":{"Env:ZabbixAccess":{},"Env:HealthCheck":{},"Env:CS-QAS":{"2017012011":{"numberOfEvents":1,"totalAnomalyScore":843.7837357256211,"avgEventDuration":55,"numberOfAnomalies":11,"totalEventDuration":55},"2017012012":{"numberOfEvents":2,"totalAnomalyScore":3892.979087356837,"avgEventDuration":140,"numberOfAnomalies":28,"totalEventDuration":140}},"Env:MGT210":{"2017012002":{"numberOfEvents":2,"totalAnomalyScore":487.79852996985,"avgEventDuration":15,"numberOfAnomalies":6,"totalEventDuration":30},"2017012010":{"numberOfEvents":6,"totalAnomalyScore":243.8996229591816,"avgEventDuration":15,"numberOfAnomalies":3,"totalEventDuration":15},"2017012012":{"numberOfEvents":7,"totalAnomalyScore":243.89948058450847,"avgEventDuration":15,"numberOfAnomalies":3,"totalEventDuration":15},"2017012014":{"numberOfEvents":8,"totalAnomalyScore":243.89967749672064,"avgEventDuration":15,"numberOfAnomalies":3,"totalEventDuration":15},"2017012009":{"numberOfEvents":5,"totalAnomalyScore":365.8486688038604,"avgEventDuration":15,"numberOfAnomalies":3,"totalEventDuration":15},"2017012008":{"numberOfEvents":4,"totalAnomalyScore":243.8994910809426,"avgEventDuration":15,"numberOfAnomalies":3,"totalEventDuration":15},"2017012005":{"numberOfEvents":3,"totalAnomalyScore":243.89922172752318,"avgEventDuration":15,"numberOfAnomalies":3,"totalEventDuration":15}},"Env:ALIGN-CS-PROD":{},"All":{"2017012419":{"numberOfEvents":1,"totalAnomalyScore":117.31007482401574,"avgEventDuration":20,"numberOfAnomalies":4,"totalEventDuration":20},"2017012011":{"numberOfEvents":1,"totalAnomalyScore":256.9054144547304,"avgEventDuration":30,"numberOfAnomalies":6,"totalEventDuration":30},"2017012012":{"numberOfEvents":2,"totalAnomalyScore":41697.516728664996,"avgEventDuration":460,"numberOfAnomalies":92,"totalEventDuration":460}},"Env:CS-PPR":{},"Env:launch-wizard-5":{},"Env:launch-wizard-6":{},"Env:CHEF210-SecChefServer-1W3D22UYZF66R":{}},"RubisDemo@siddoshi93":{"All":{}},"procdemo@siddoshi93":{"All":{}},"Cassandra11050@guest":{"All":{"":{"numberOfEvents":0,"totalAnomalyScore":0,"avgEventDuration":0,"numberOfAnomalies":0,"totalEventDuration":0},"2017012415":{"numberOfEvents":5,"totalAnomalyScore":903,"avgEventDuration":419,"numberOfAnomalies":419,"totalEventDuration":419},"2017012412":{"numberOfEvents":4,"totalAnomalyScore":229,"avgEventDuration":134,"numberOfAnomalies":134,"totalEventDuration":134},"2017012411":{"numberOfEvents":3,"totalAnomalyScore":111,"avgEventDuration":70,"numberOfAnomalies":70,"totalEventDuration":70},"2017012422":{"numberOfEvents":6,"totalAnomalyScore":135,"avgEventDuration":59,"numberOfAnomalies":59,"totalEventDuration":59},"2017012311":{"numberOfEvents":2,"totalAnomalyScore":46,"avgEventDuration":26,"numberOfAnomalies":26,"totalEventDuration":26},"2017012305":{"numberOfEvents":1,"totalAnomalyScore":58,"avgEventDuration":47,"numberOfAnomalies":47,"totalEventDuration":47}}},"awsk8s@zhuxiyun":{"All":{}},"testzxy01@zhuxiyun":{"All":{}},"CloudWatchProductionDB@miv":{"All":{}},"QPID-5531@jhe16":{"All":{"":{"numberOfEvents":0,"totalAnomalyScore":0,"avgEventDuration":0,"numberOfAnomalies":0,"totalEventDuration":0},"2017012316":{"numberOfEvents":5,"totalAnomalyScore":115,"avgEventDuration":78,"numberOfAnomalies":78,"totalEventDuration":78},"2017012314":{"numberOfEvents":4,"totalAnomalyScore":231,"avgEventDuration":146,"numberOfAnomalies":146,"totalEventDuration":146},"2017012317":{"numberOfEvents":6,"totalAnomalyScore":205,"avgEventDuration":125,"numberOfAnomalies":125,"totalEventDuration":125},"2017012306":{"numberOfEvents":1,"totalAnomalyScore":287,"avgEventDuration":135,"numberOfAnomalies":135,"totalEventDuration":135},"2017012409":{"numberOfEvents":13,"totalAnomalyScore":47,"avgEventDuration":26,"numberOfAnomalies":26,"totalEventDuration":26},"2017012312":{"numberOfEvents":3,"totalAnomalyScore":28,"avgEventDuration":16,"numberOfAnomalies":16,"totalEventDuration":16},"2017012321":{"numberOfEvents":9,"totalAnomalyScore":113,"avgEventDuration":23,"numberOfAnomalies":46,"totalEventDuration":46},"2017012320":{"numberOfEvents":7,"totalAnomalyScore":57,"avgEventDuration":36,"numberOfAnomalies":36,"totalEventDuration":36},"2017012310":{"numberOfEvents":2,"totalAnomalyScore":53,"avgEventDuration":27,"numberOfAnomalies":27,"totalEventDuration":27},"2017012322":{"numberOfEvents":10,"totalAnomalyScore":189,"avgEventDuration":74,"numberOfAnomalies":74,"totalEventDuration":74},"2017012415":{"numberOfEvents":18,"totalAnomalyScore":1164,"avgEventDuration":487,"numberOfAnomalies":487,"totalEventDuration":487},"2017012407":{"numberOfEvents":11,"totalAnomalyScore":36,"avgEventDuration":23,"numberOfAnomalies":23,"totalEventDuration":23},"2017012412":{"numberOfEvents":16,"totalAnomalyScore":40,"avgEventDuration":21,"numberOfAnomalies":21,"totalEventDuration":21},"2017012408":{"numberOfEvents":12,"totalAnomalyScore":36,"avgEventDuration":22,"numberOfAnomalies":22,"totalEventDuration":22},"2017012413":{"numberOfEvents":17,"totalAnomalyScore":239,"avgEventDuration":109,"numberOfAnomalies":109,"totalEventDuration":109},"2017012410":{"numberOfEvents":14,"totalAnomalyScore":61,"avgEventDuration":25,"numberOfAnomalies":25,"totalEventDuration":25},"2017012411":{"numberOfEvents":15,"totalAnomalyScore":46,"avgEventDuration":21,"numberOfAnomalies":21,"totalEventDuration":21}}},"proxytest@siddoshi93":{"All":{}},"EC2CloudWatch2@guest":{"Env:launch-wizard-18":{},"Env:OpenTSDB":{},"Env:default":{},"Env:launch-wizard-9":{},"Env:awseb-e-mpufpehkip":{},"Env:launch-wizard-13":{},"Env:launch-wizard-10":{},"All":{"":{"numberOfEvents":0,"totalAnomalyScore":0,"avgEventDuration":0,"numberOfAnomalies":0,"totalEventDuration":0},"2017012418":{"numberOfEvents":4,"totalAnomalyScore":428,"avgEventDuration":20,"numberOfAnomalies":4,"totalEventDuration":20},"2017012416":{"numberOfEvents":2,"totalAnomalyScore":321,"avgEventDuration":15,"numberOfAnomalies":3,"totalEventDuration":15},"2017012417":{"numberOfEvents":3,"totalAnomalyScore":428,"avgEventDuration":20,"numberOfAnomalies":4,"totalEventDuration":20},"2017012414":{"numberOfEvents":1,"totalAnomalyScore":321,"avgEventDuration":15,"numberOfAnomalies":3,"totalEventDuration":15},"2017012423":{"numberOfEvents":6,"totalAnomalyScore":749,"avgEventDuration":45,"numberOfAnomalies":9,"totalEventDuration":45},"2017012420":{"numberOfEvents":5,"totalAnomalyScore":1498,"avgEventDuration":95,"numberOfAnomalies":19,"totalEventDuration":95}},"Env:launch-wizard-5":{},"Env:launch-wizard-8":{},"Env:launch-wizard-2":{}},"myawsdemo@siddoshi93":{"All":{}},"Ziggeo@ziggeo":{"Env:Ziggeo Webserver Direct VPN":{},"Env:Ziggeo Wowza Direct VPN":{},"Env:Ziggeo SSH VPN":{},"Env:Ziggeo Wowza VPN":{},"Env:Ziggeo Webserver VPN":{},"All":{"":{"numberOfEvents":0,"totalAnomalyScore":0,"avgEventDuration":0,"numberOfAnomalies":0,"totalEventDuration":0},"2017012316":{"numberOfEvents":2,"totalAnomalyScore":1,"avgEventDuration":5,"numberOfAnomalies":1,"totalEventDuration":5},"2017012418":{"numberOfEvents":10,"totalAnomalyScore":1,"avgEventDuration":5,"numberOfAnomalies":1,"totalEventDuration":5},"2017012402":{"numberOfEvents":3,"totalAnomalyScore":1,"avgEventDuration":5,"numberOfAnomalies":1,"totalEventDuration":5},"2017012403":{"numberOfEvents":4,"totalAnomalyScore":1,"avgEventDuration":5,"numberOfAnomalies":1,"totalEventDuration":5},"2017012417":{"numberOfEvents":9,"totalAnomalyScore":49,"avgEventDuration":5,"numberOfAnomalies":2,"totalEventDuration":10},"2017012423":{"numberOfEvents":14,"totalAnomalyScore":267,"avgEventDuration":20,"numberOfAnomalies":4,"totalEventDuration":20},"2017012415":{"numberOfEvents":7,"totalAnomalyScore":4,"avgEventDuration":15,"numberOfAnomalies":3,"totalEventDuration":15},"2017012407":{"numberOfEvents":5,"totalAnomalyScore":2,"avgEventDuration":10,"numberOfAnomalies":2,"totalEventDuration":10},"2017012408":{"numberOfEvents":6,"totalAnomalyScore":3,"avgEventDuration":15,"numberOfAnomalies":3,"totalEventDuration":15},"2017012420":{"numberOfEvents":12,"totalAnomalyScore":135,"avgEventDuration":8,"numberOfAnomalies":3,"totalEventDuration":15},"2017012421":{"numberOfEvents":13,"totalAnomalyScore":144,"avgEventDuration":15,"numberOfAnomalies":3,"totalEventDuration":15},"2017012310":{"numberOfEvents":1,"totalAnomalyScore":1,"avgEventDuration":5,"numberOfAnomalies":1,"totalEventDuration":5}}},"Test@sangram":{"All":{}},"awsFused@guest":{"Env:DynamoDB":{},"Env:launch-wizard-18":{},"Env:OpenTSDB":{},"Env:default":{},"Env:launch-wizard-9":{},"Env:awseb-e-mpufpehkip":{},"Env:launch-wizard-13":{},"Env:launch-wizard-10":{},"All":{"":{"numberOfEvents":0,"totalAnomalyScore":0,"avgEventDuration":0,"numberOfAnomalies":0,"totalEventDuration":0},"2017012418":{"numberOfEvents":4,"totalAnomalyScore":361,"avgEventDuration":20,"numberOfAnomalies":4,"totalEventDuration":20},"2017012417":{"numberOfEvents":3,"totalAnomalyScore":361,"avgEventDuration":15,"numberOfAnomalies":3,"totalEventDuration":15},"2017012414":{"numberOfEvents":2,"totalAnomalyScore":240,"avgEventDuration":15,"numberOfAnomalies":3,"totalEventDuration":15},"2017012423":{"numberOfEvents":6,"totalAnomalyScore":602,"avgEventDuration":30,"numberOfAnomalies":6,"totalEventDuration":30},"2017012420":{"numberOfEvents":5,"totalAnomalyScore":1445,"avgEventDuration":95,"numberOfAnomalies":19,"totalEventDuration":95},"2017012321":{"numberOfEvents":6,"totalAnomalyScore":0,"avgEventDuration":0,"numberOfAnomalies":0,"totalEventDuration":0}},"Env:launch-wizard-5":{},"Env:launch-wizard-8":{},"Env:launch-wizard-2":{}},"MemcachedBug106@guest":{"All":{"":{"numberOfEvents":0,"totalAnomalyScore":0,"avgEventDuration":0,"numberOfAnomalies":0,"totalEventDuration":0}}},"CloudWatchTest@eventi":{"Env:awseb-e-xazfzuvmpm":{},"Env:staging2-website":{},"Env:fdb-manager-staging":{},"Env:dev2-splunk":{},"All":{"":{"numberOfEvents":0,"totalAnomalyScore":0,"avgEventDuration":0,"numberOfAnomalies":0,"totalEventDuration":0},"2017012416":{"numberOfEvents":2,"totalAnomalyScore":8000,"avgEventDuration":40,"numberOfAnomalies":8,"totalEventDuration":40}},"Env:dev2-jenkins":{},"Env:dev2-vpn":{},"Env:awseb-e-dtevbvt5y3":{},"Env:jenkins.beta.cat":{},"Env:dev2-daemon":{},"Env:dev2-manager":{},"Env:hackathon-instances":{},"Env:awseb-e-kpzb4g2cu2":{},"Env:awseb-e-fa4dpytm4k":{},"Env:dev2-website":{},"Env:awseb-e-9k4px4nm2z":{},"Env:dev2-website-responsive":{},"Env:orbit-eb":{},"Env:awseb-e-wvvb5hwcmq":{},"Env:qadashboard":{},"Env:launch-wizard-2":{}},"syscallTest4@ting":{"All":{}},"datadog3@guest":{"All":{"":{"numberOfEvents":0,"totalAnomalyScore":0,"avgEventDuration":0,"numberOfAnomalies":0,"totalEventDuration":0}}},"datadogproxy@siddoshi93":{"All":{}},"ncsualaska@wangpeipei.90":{"All":{}},"dck@orientez":{"All":{}},"test-linode@javasoze":{"All":{}},"test-1@orientez":{"All":{}},"test@licyh":{"All":{}},"CloudWatchProduction@miv":{"All":{}},"henry-cluster1@zhuxiyun":{"All":{}},"Cassandra5064@guest":{"All":{"":{"numberOfEvents":0,"totalAnomalyScore":0,"avgEventDuration":0,"numberOfAnomalies":0,"totalEventDuration":0},"2017012402":{"numberOfEvents":1,"totalAnomalyScore":910,"avgEventDuration":204,"numberOfAnomalies":204,"totalEventDuration":204},"2017012416":{"numberOfEvents":2,"totalAnomalyScore":2091,"avgEventDuration":443,"numberOfAnomalies":443,"totalEventDuration":443}}},"CloudWatchProductionEC2@miv":{"All":{}},"TDXProduction@miv":{"All":{}},"hotel@juliennadal":{"All":{}},"Infrastructure@guest":{"All":{"":{"numberOfEvents":0,"totalAnomalyScore":0,"avgEventDuration":0,"numberOfAnomalies":0,"totalEventDuration":0}}},"exogeni-jolokia-renci@mertcevik":{"All":{}},"k8aws@guest":{"All":{}},"Production@miv":{"All":{}},"ElasticSearch@sulrichs":{"All":{}},"Pinterest@Xiaoqiao Meng":{"Service:hbase-zencsr-a01":{},"Service:search-asterix-autocomplete":{},"Service:growth-experienceservice":{},"Service:merced":{},"Service:offsite":{},"Service:hbase-terrapinhighqps-e01":{},"Service:sparktest":{},"Service:hbase-terrapinmain-e01":{},"Service:adscraper":{},"Service:latest-api":{},"Service:sonic":{},"Service:analyticskafkazookeeper":{},"Service:es-devsite":{},"Service:datastorm-supervisor":{},"Service:clustermgr":{},"Service:pinlaterinfracacheworker":{},"Service:visual-caffe":{},"Service:infra-cache-board":{},"Service:transporter-data01":{},"Service:hbase-terrapinmain-a01":{},"Service:m10n-firstorderjoiner":{},"Service:traffic-cdn-log-collector":{},"Service:qubolemetrics":{},"Service:nagios-ui":{},"Service:m10ndev":{},"Service:hbase-zencsr-e02":{},"Service:realpinnability":{},"Service:m10n-jaguar-agg":{},"Service:ec-goldpick":{},"Service:qubole-datacore":{},"Service:pinlinks":{},"Service:imagematcher":{},"Service:m10n-rt-spend-mapper":{},"Service:pinqueue-opensource":{},"Service:phabricator_commitstaging":{},"Service:zencanonicalpin":{},"Service:hbase-terrapinhighqps-a01":{},"Service:stingray-rule-repo-lb":{},"Service:integ-stingray":{},"Service:infra-cache-imgmeta":{},"Service:m10n-sterling-test":{},"Service:worker":{},"Service:wall":{},"Service:hbase-discovery-e":{},"Service:m10n-cron":{},"Service:it":{},"Service:stingray-sync":{},"Service:insightsservice":{},"Service:monarch":{},"Service:smartfeedgenerator":{},"Service:hbase-opentsdb-edev01":{},"Service:tenansix":{},"Service:userservice":{},"Service:cloudeng-devapp":{},"Service:pinlaterdiscovery":{},"Service:metricskafka":{},"Service:infra-copperfield":{},"Service:csepinqueue":{},"Service:generalmysql":{},"Service:hbase-zensmartfeedpools-e01":{},"Service:morpheus":{},"Service:hbase-zencanonicalpin-d01":{},"Service:socialnetworkservice":{},"Service:pinshot":{},"Service:m10n-manas-index-builder":{},"Service:backfillpinballworker":{},"Service:metastore_rw_test":{},"Service:casper":{},"Service:spamservice":{},"Service:varnishwidgets2":{},"Service:rtpkafka":{},"Service:pinlaterm10n-generic-worker":{},"Service:presto":{},"Service:realpin-dev":{},"Service:hbase-zensmartfeedmaterialized-c01":{},"Service:infra-cache-userpins":{},"Service:usermetastore":{},"Service:phabricator_drydock":{},"Service:flowlogs":{},"Service:infra-cache-zen-notification":{},"Service:pinpin-staging":{},"Service:pinlater_pinot_thrift":{},"Service:varnishapp2":{},"Service:electric-ray":{},"Service:videotranscoder":{},"Service:infra-cache-search":{},"Service:realpin-hfstaging":{},"Service:bptredis":{},"Service:contacts":{},"Service:datazk":{},"Service:hbase-terrapinlowqps-e01":{},"Service:obelix":{},"Service:pinlaterfsreadworker":{},"Service:userlikesredis":{},"Service:metastore-server":{},"Service:pinlaterhighqps":{},"Service:pinlaterengagementworker":{},"Service:sterlingadmin":{},"Service:growth-experience-hq":{},"Service:datastorm-zookeeper":{},"Service:cache-unicorns":{},"Service:instantpfy":{},"Service:crongrowth":{},"Service:pinlaterblackopsworker":{},"Service:zen_test_cluster":{},"Service:fantasio":{},"Service:m10n-pinqueue-prod":{},"Service:plex":{},"Service:infra-cache-user":{},"Service:pinlatercommerceworker":{},"Service:qubole-spark":{},"Service:firefly":{},"Service:atlas":{},"Service:testkafka":{},"Service:realpinleafinstant":{},"Service:pinlaterinterestsexpworker":{},"Service:pinlens":{},"Service:qubole-dataworkflow":{},"Service:hbase-hbaseanalytics-a01":{},"Service:phobos":{},"Service:ec-bedrock":{},"Service:hbase-usermetastore-d01":{},"Service:teletraandb":{},"Service:nuxfeed":{},"Service:discoverykafka":{},"Service:m10n-varnish-analytics":{},"Service:infra-cache-richpin":{},"Service:roadrunnerserv":{},"Service:hbase-hbasetest-e01":{},"Service:flawless":{},"Service:hbase-hbasetest-e03":{},"Service:hbase-hdfsbackup-a02":{},"Service:polaris-hf":{},"Service:m10n-lazarus":{},"Service:ec-app":{},"Service:integ-stingray-antenna":{},"Service:m10n-shopping-lazarus":{},"Service:hbase-hbasetest-a03":{},"Service:ec-api":{},"Service:hbase-hbasetest-a04":{},"Service:manageengine":{},"Service:pinlaterm10n-cybersource-worker":{},"Service:stingray-antenna":{},"Service:terrapinmainoffline-a01":{},"Service:pinnabilitylite":{},"Service:hbase-zennotifications-a01":{},"Service:hbase-hbasetest-a01":{},"Service:cloudeng-viz-es-clusters":{},"Service:ecommerce-sftp":{},"Service:hbase-zennotifications-d02":{},"Service:stingray-rewind":{},"Service:qubole-searchexp":{},"Service:realpin-p2p-exp":{},"Service:opentsdb-pinstorm":{},"Service:m10nzk":{},"Service:infra-cache-pinacle":{},"Service:cache-topic-ratelimit":{},"Service:tsd_amp2_write":{},"Service:gironde":{},"Service:dataservices":{},"Service:zenshared":{},"Service:neardup":{},"Service:gateway":{},"Service:idgenerator_test":{},"Service:opentsdb/hbase test cluster":{},"Service:discovery-gpu-spam":{},"Service:pinlaterfsworker":{},"Service:zenlinkbenchhbase":{},"Service:infra-cache-pin":{},"Service:m10n-varnish-sterling":{},"Service:logsearch_monitor_service":{},"Service:pinlaterinterests":{},"Service:m10n-adsapi-prod":{},"Service:pinlateradhoc":{},"Service:niagara":{},"Service:realpin-fantasio":{},"Service:dbs":{},"Service:internaltoolsdb":{},"Service:infra-cache-discovery-spotlight":{},"Service:hbase-pinstorm-a01":{},"Service:docker":{},"Service:ec-admin":{},"Service:infra-cache-sourcestats":{},"Service:ec-prospector":{},"Service:viz-storm":{},"Service:zennotifications":{},"Service:packer":{},"Service:master":{},"Service:puppet-dev":{},"Service:cloudeng-viz-storm":{},"Service:normandie":{},"Service:pinlaterexploreworker":{},"Service:hbase-opentsdb-emp01":{},"Service:hbase-imagesignature-a01":{},"Service:stingray-barb":{},"Service:hbase-typeahead-a01":{},"Service:datakafka":{},"Service:m10nkafka":{},"Service:pinlaterinterestspublicfeedworker":{},"Service:anticlimax":{},"Service:pintersection":{},"Service:jenkinsmaster":{},"Service:qubole-growth":{},"Service:m10n-sterling-prod":{},"Service:opsbox":{},"Service:croninfra":{},"Service:cron":{},"Service:m10n-utzrt":{},"Service:stingray-dsl-mapper":{},"Service:kafka":{},"Service:hbase-experimentmetrics-d01":{},"Service:sterling":{},"Service:realpin-ucs":{},"Service:pcpportal":{},"Service:cloudeng-viz-tsd":{},"Service:dictionaryservice":{},"Service:infra-cache-zen-main-messages":{},"Service:rstudioserver":{},"Service:vwservice":{},"Service:realpin-p2p2":{},"Service:pinacle":{},"Service:metastoredb":{},"Service:infra-cache-growth-messages":{},"Service:opsdb":{},"Service:blackopskafka":{},"Service:m10n-adsapi-latest":{},"Service:infra-metadataextractor":{},"Service:usersignalservice":{},"Service:cache-high-reliability":{},"Service:pinlaterpinotworker":{},"Service:terrapin":{},"Service:hbase-opentsdb-ctc01":{},"Service:followerservicemysql":{},"Service:vpc-analytics-dev":{},"Service:rtp-docker":{},"Service:infra-cache-growth-news":{},"Service:infra-cache-usermetadata":{},"Service:integ-stingray-dsl-mapper":{},"Service:pinballmaster":{},"Service:growth-boardscoring":{},"Service:m10n-bethlehem-sov":{},"Service:pinco":{},"Service:zipkin":{},"Service:realpinleafpeach":{},"Service:hbase-zennotifications-dev01":{},"Service:m10n-sunray":{},"Service:m10n-utzv2":{},"Service:rio":{},"Service:pyapns":{},"Service:pinalytics-thrift":{},"Service:zen_testmysql":{},"Service:infra-cache-pinacle-p2p":{},"Service:limousin":{},"Service:test12345":{},"Service:hbase-imagesignature-e01":{},"Service:jobberpinball":{},"Service:m10n-cola":{},"Service:asterix":{},"Service:overwatch-master":{},"Service:discovery-smartfeed-nonmatgenerator":{},"Service:infra-cache-homefeed":{},"Service:sofia":{},"Service:analyticsapp-slow-request":{},"Service:cmp_docker":{},"Service:opentsdb-prod":{},"Service:pinlaterinterestspostrepinworker":{},"Service:commerceconfigdb-stage":{},"Service:pinlateraggregatedpinworker":{},"Service:contextual_test":{},"Service:security-auth":{},"Service:m10n-example":{},"Service:myzenfollowerdb":{},"Service:cloudeng-pinrepo-prod":{},"Service:sessionmanagercache":{},"Service:hbase-zensmartfeedmaterialized-e01":{},"Service:usermetastore-ads":{},"Service:pinlaterseoworker":{},"Service:discovery-pinacle":{},"Service:discovery-pineapple":{},"Service:latest":{},"Service:pixie2":{},"Service:zenrawcsr":{},"Service:pinlater_fs_thrift":{},"Service:expected-insertions":{},"Service:pinlaterviralityworker":{},"Service:puppetmisc":{},"Service:vennservice":{},"Service:calvados":{},"Service:rtp-mesos":{},"Service:realpin-interest":{},"Service:pinlaterlinkqualityworker":{},"Service:hbase-usermetastore-a01":{},"Service:rtp-rl-dynox":{},"Service:tastemakerdb-proxy":{},"Service:cache-mpgeoip":{},"Service:mysql_56_stable_prod":{},"Service:memcache":{},"Service:visibility-colt":{},"Service:esouhrada":{},"Service:ec-cron":{},"Service:phabricator":{},"Service:redis":{},"Service:m10n-astoria":{},"Service:logstash_sumo":{},"Service:dev":{},"Service:knox":{},"Service:contextual":{},"Service:mysql_56_stable_secure":{},"Service:hbase-zencanonicalpin-a02":{},"Service:servicelog":{},"Service:rtp-fs-dynox-integ":{},"Service:frontend":{},"Service:qubole-data":{},"Service:hbase-zeninterests-a01":{},"Service:expected-insertions-ad-group":{},"Service:alation":{},"Service:rtp-content-filter":{},"Service:tsd_amp2_read":{},"Service:gmond":{},"Service:infra-cache-coremisc":{},"Service:discovery-pinlinks":{},"Service:infra-cache-zen-canonicalpin":{},"Service:zen_csr":{},"Service:pinlaterimage":{},"Service:pinlatermessageworker":{},"Service:stingray-mass-action-taker":{},"Service:infra-cache-growth-autotune":{},"Service:zenmemcacheclient":{},"Service:security-monkey":{},"Service:confluence":{},"Service:m10n-jaguar-shard":{},"Service:hbaseanalyticsthrift":{},"Service:pinlaterrichpins":{},"Service:cachereport":{},"Service:ngapp2":{},"Service:hologram":{},"Service:interests":{},"Service:pinlater-ec-worker":{},"Service:metastore":{},"Service:neuron":{},"Service:id_generator":{},"Service:bordercontrol":{},"Service:infra-manas":{},"Service:coreapp-adminapp-prod":{},"Service:sov-lazarusleaf":{},"Service:infra-cache-rtp-ratelimit-shackle":{},"Service:m10n-ctrack-prod":{},"Service:m10nstorm-prod":{},"Service:m10n-codfish":{},"Service:overwatch":{},"Service:hbase-adsanalytics-d01":{},"Service:synapse":{},"Service:data-canary-monitor":{},"Service:ratelimitcache":{},"Service:qubole-m10n":{},"Service:node":{},"Service:cache-zen-newshub":{},"Service:usermessagingredis":{},"Service:cloudeng-viz-carbon":{},"Service:cache-zen":{},"Service:visibility-bolt":{},"Service:zenlinkbenchmysql":{},"Service:group2":{},"Service:infra-cache-zen-urlstore":{},"Service:m10n-mohawk":{},"Service:visibility-opentsdb":{},"Service:zenurlstore":{},"Service:pinball":{},"Service:puppetmaster":{},"Service:canary-api":{},"Service:deployboard":{},"Service:observerzookeeper":{},"Service:m10n-shopping-bethlehem":{},"Service:infra-cache-rtp-spamobjects":{},"Service:manas":{},"Service:m10n-varnish-ctrack-prod":{},"Service:realpinpinnability2":{},"Service:ec-loupe":{},"Service:adspinballworker":{},"Service:hbase-pinalyticsv2-a01":{},"Service:audupload":{},"Service:visibility-mesos":{},"Service:cloudeng-infra-nagios":{},"Service:realpin-shared":{},"Service:hbase-zenmain-d01":{},"Service:infra-cache-m10n-insertions":{},"Service:discovery-train":{},"Service:hbase-zenurlstore-c02":{},"Service:jenkins-slave":{},"Service:hbase-zenrawcsr-e01":{},"Service:infra-smartpinservice":{},"Service:infra-cache-zen-interests":{},"Service:opengrok":{},"Service:adminnginx":{},"Service:adhoc":{},"Service:mesos-test":{},"Service:infra-cache-stingray":{},"Service:zookeeper":{},"Service:pinlater_migration_thrift":{},"Service:pinlatermessagedb":{},"Service:visualsearch":{},"Service:sov-lazarusagg":{},"Service:publicfeedredis":{},"Service:ec-varnish":{},"Service:skyline":{},"Service:smartfeedservice":{},"Service:security-brittany":{},"Service:m10n-reqtracer":{},"Service:hbase-opentsdb-amp01":{},"Service:pinlaterinterestsfeedworker":{},"Service:aragog":{},"Service:zkservice":{},"Service:ngapi2":{},"Service:pixie":{},"Service:tripwire":{},"Service:brood":{},"Service:cloudeng-nagios-prod":{},"Service:cloudeng-viz-es04":{},"Service:infra-cache-stats":{},"Service:ec-220cal":{},"Service:hbase-opentsdb-atc01":{},"Service:crondata":{},"Service:regionserver":{},"Service:pinlatermessagethrift":{},"Service:phabulous":{},"Service:pinlaternotifythrift":{},"Service:m10n-analyzer":{},"Service:m10n-rt-spend-reducer":{},"Service:pinlaterrichpinsdb":{},"Service:rtp-stingray":{},"Service:metadataextractor":{},"Service:infra-cache-wildcard":{},"Service:mysql_56_latest_prod":{},"Service:stingray":{},"Service:smartfeedworker":{},"Service:infra-cache-zen-follower-sml":{},"Service:zensmartfeedstorage":{},"Service:friendservice":{},"Service:pinpin":{},"Service:elixirtest-d01":{},"Service:infra-cache-gutter":{},"Service:overwatch-zookeeper":{},"Service:asterixcache":{},"Service:analyticsapp":{},"Service:zensmartfeedqueue":{},"Service:pinlateremailthrift":{},"Service:aperture":{},"Service:m10n-analytics-prod":{},"Service:pinnability":{},"Service:integ_stingray_frontend_lb":{},"Service:sessionmanager":{},"Service:ngwidgets":{},"Service:jira":{},"Service:pinlatergrowth":{},"Service:funnelsearch":{},"Service:zenmain":{},"Service:prod":{},"Service:group123":{},"Service:infra-cache-ums-growth":{},"Service:pinlatertest":{},"Service:coladb":{},"Service:pinlatersmartfeedworker":{},"Service:devapp":{},"Service:pincert":{},"Service:electro":{},"Service:m10n-orgtrack":{},"Service:cronops":{},"Service:cookiemonster":{},"Service:discovery":{},"Service:email-delivery-service":{},"Service:pinandboardservice":{},"Service:qubole-search":{},"Service:hbase-typeahead-e01":{},"Service:m10n-bethlehem-shard":{},"Service:pinlaterfrontierworker":{},"Service:pinlaterm10nthrift":{},"Service:nickgroup":{},"Service:tsd_asl_write":{},"Service:infra-cache-umsfriend-prod":{},"Service:infra-cache-zen-shared":{},"Service:m10n-adsapi-test":{},"Service:m10n-tsui":{},"Service:data-firefly":{},"Service:peach":{},"Service:realpin-waldorf":{},"Service:namenode":{},"Service:tools":{},"Service:grafana":{},"Service:builder":{},"Service:teletraan":{},"Service:infra-cache-zen-follower":{},"Service:qubole-m10n_hourly":{},"Service:discovery-eval":{},"Service:testrequest":{},"Service:qubole-hive-cli":{},"Service:pinqueue":{},"Service:realpinleafspampins":{},"Service:pinlater-neardupworker":{},"Service:saigon":{},"Service:pinlatersofiaworker":{},"Service:base":{},"Service:u2bstore-test":{},"Service:hbase-zeninterests-d02":{},"Service:sweeper":{},"Service:hbase-zenurlstore-e01":{},"Service:deploy-agent-test":{},"Service:datastorm-nimbus":{},"Service:varnishapi2":{},"Service:hbase-zensmartfeedpools-d01":{},"Service:qubole-backfill":{},"Service:elasticsearch":{},"Service:spark":{},"Service:realpinpinnability":{},"Service:batch":{},"Service:hbase-zenmain-e01":{},"Service:cmp_base":{},"Service:cloudeng-changefeed":{},"Service:pinlaterinfra":{},"Service:visualapi":{},"Service:fingerprint":{},"Service:es-05-kibana":{},"Service:abexperimentsdb":{},"Service:realpin-batchswapped":{},"Service:terrapin-zk":{},"Service:jenkins":{},"Service:logservice":{},"Service:cloudeng-viz-kibana":{},"Service:memsql":{},"Service:hbase-hbasetest-c01":{},"Service:cpclassifier":{},"Service:m10n-ml":{},"Service:shnguyen-kafka":{},"Service:polaris-test":{},"Service:discovery-realpinnability":{},"Service:usercontextservice":{},"Service:zenfollowermysql":{},"Service:shame":{},"Service:nutcracker":{},"Service:rapidscore":{},"Service:pinlaterinterestseverythingfeedworker":{},"Service:zeninterests":{},"Service:tensorflow-gpu":{},"Service:jenkins_worker":{},"Service:manas-frontier-sev":{},"Service:cloudeng-viz-metrics":{},"Service:hbase-roadrunner-d01":{},"Service:realpinrootpeach":{},"Service:pinlaterweeklyemail":{},"Service:mysql-cron":{},"Service:security_contractor":{},"Service:realpinrootspampins":{},"Service:netacuity":{},"Service:black_hold":{},"Service:usermetastoretestthrift":{},"Service:ecs-test":{},"Service:overwatch-slave":{},"Service:ldap":{},"Service:gmetad":{},"Service:datalayer":{},"Service:devsite":{},"Service:m10n-moonray":{},"Service:realpin-pinnability":{},"Service:legaldb":{},"Service:pinlaterexperienceworker":{}},"ApacheSysCall@guest":{"All":{}},"servletDemo@siddoshi93":{"All":{}},"RUBiSTest@prbehera":{"All":{"":{"numberOfEvents":0,"totalAnomalyScore":0,"avgEventDuration":0,"numberOfAnomalies":0,"totalEventDuration":0},"2017012316":{"numberOfEvents":5,"totalAnomalyScore":45,"avgEventDuration":32,"numberOfAnomalies":32,"totalEventDuration":32},"2017012300":{"numberOfEvents":1,"totalAnomalyScore":1015,"avgEventDuration":756,"numberOfAnomalies":756,"totalEventDuration":756},"2017012314":{"numberOfEvents":4,"totalAnomalyScore":175,"avgEventDuration":123,"numberOfAnomalies":123,"totalEventDuration":123},"2017012313":{"numberOfEvents":3,"totalAnomalyScore":74,"avgEventDuration":54,"numberOfAnomalies":54,"totalEventDuration":54},"2017012318":{"numberOfEvents":8,"totalAnomalyScore":124,"avgEventDuration":91,"numberOfAnomalies":91,"totalEventDuration":91},"2017012317":{"numberOfEvents":7,"totalAnomalyScore":80,"avgEventDuration":29,"numberOfAnomalies":57,"totalEventDuration":57},"2017012312":{"numberOfEvents":2,"totalAnomalyScore":57,"avgEventDuration":43,"numberOfAnomalies":43,"totalEventDuration":43},"2017012321":{"numberOfEvents":11,"totalAnomalyScore":54,"avgEventDuration":20,"numberOfAnomalies":40,"totalEventDuration":40},"2017012320":{"numberOfEvents":9,"totalAnomalyScore":61,"avgEventDuration":44,"numberOfAnomalies":44,"totalEventDuration":44},"2017012322":{"numberOfEvents":12,"totalAnomalyScore":115,"avgEventDuration":82,"numberOfAnomalies":82,"totalEventDuration":82},"2017012402":{"numberOfEvents":13,"totalAnomalyScore":22,"avgEventDuration":16,"numberOfAnomalies":16,"totalEventDuration":16},"2017012403":{"numberOfEvents":14,"totalAnomalyScore":33,"avgEventDuration":24,"numberOfAnomalies":24,"totalEventDuration":24},"2017012406":{"numberOfEvents":16,"totalAnomalyScore":77,"avgEventDuration":29,"numberOfAnomalies":58,"totalEventDuration":58},"2017012415":{"numberOfEvents":18,"totalAnomalyScore":615,"avgEventDuration":469,"numberOfAnomalies":469,"totalEventDuration":469},"2017012407":{"numberOfEvents":17,"totalAnomalyScore":576,"avgEventDuration":439,"numberOfAnomalies":439,"totalEventDuration":439}}},"hbase@shuwang":{"All":{}},"NewrelicDemo@siddoshi93":{"All":{}},"testcgroup@zhuxiyun":{"All":{}}},"success":true};
	  // return {'data':{},'success':false};
  }

  // Set up date and variables for epoch math
  let d = new Date();
  const viewMillisOffset = d.getTimezoneOffset() * 60 * 1000; 
  const millisInDay = 24 * 60 * 60 * 1000;
  const millisInHour = 60 * 60 * 1000;
  console.log(endTimestamp+" :: "+durationInDays);
  let earliestDataHour = topOfHour(endTimestamp - (durationInDays * millisInDay));
  let earliestViewHour = topOfHour(endTimestamp - (durationInDays * millisInDay) - viewMillisOffset);
  console.log("edh: "+earliestDataHour);
  console.log("evh: "+earliestViewHour);
  if (topOfHour(earliestDataHour - viewMillisOffset) == topOfDay(earliestDataHour - viewMillisOffset)) {
	  earliestViewHour = topOfDay(earliestDataHour - viewMillisOffset);
  } else {
	  earliestViewHour = topOfDay(earliestDataHour + millisInDay - viewMillisOffset);
  }  
  // Initialize 'aggregates' (return object)
  let aggregates = {};
  aggregates['duration'] = durationInDays;
  aggregates['endTimestamp'] = endTimestamp;
  aggregates['period'] = periodInHours;
  aggregates['dayLabels'] = [];
  aggregates['totalEvents'] = 0;
  aggregates['totalAnomalyScore'] = 0;
  aggregates['totalAnomalyCount'] = 0;
  aggregates['totalEventDuration'] = 0;
  aggregates['totalDurationEvents'] = 0;

  // Setup time metadata in response
  
  // Make month 01-12 and pad other fields appropriately
  function mdhFormatter(value,field) {
	  if (field == "month") {value = value + 1};
	  if (value < 10) {value = "0"+value;}
	  return value;
  }
  // Returns epoch in millis for beginning of the hour
  function topOfHour(epoch) {
	  epoch = epoch - (epoch % (60 * 60 * 1000));
	  return epoch;
  }
  // Returns epoch in millis for beginning of day
  function topOfDay(epoch) {
	  epoch = epoch - (epoch % (24 * 60 * 60 * 1000));
	  return epoch;
  } 
  // Returns well-formatted date for data access
  function dateFormatter(date) {
	  return date.getUTCFullYear() +""+ mdhFormatter(date.getUTCMonth(),"month") +""+ mdhFormatter(date.getUTCDate(),"date") +""+ mdhFormatter(date.getUTCHours(),"hours");
  }
  
  let utcNow = dateFormatter(d); 
  let viewNow = dateFormatter(new Date(d.getTime() - viewMillisOffset));

  console.log("UTC Now: "+utcNow+"  View Now: "+viewNow+ "  Duration: " +durationInDays+ "  endTimestamp: " +endTimestamp);
  
  aggregates['earliestDataHour'] = earliestDataHour; 
  
  aggregates['earliestViewHour'] = earliestViewHour;
  console.log("evh: "+earliestViewHour+"  "+new Date(earliestViewHour)+"  edh: "+earliestDataHour+"  "+new Date(earliestDataHour));
  console.log(aggregates);
  
  if (jsonResponse['success']) {
	  
	  // Aggregate all values to hours
	  for (var pname in jsonResponse['data']) {
		  if (pname === undefined) {
			  continue;
		  } else {
			  if (aggregates[pname] === undefined) {
				  aggregates[pname] = {};
				  aggregates[pname]['totalEvents'] = 0;							  
				  aggregates[pname]['totalAnomalyScore'] = 0;							  
				  aggregates[pname]['totalAnomalyCount'] = 0;							  
				  aggregates[pname]['totalEventDuration'] = 0;							  
				  aggregates[pname]['totalDurationEvents'] = 0;							  
			  }
			  //console.log(pname);
			  for (var gname in jsonResponse['data'][pname]) {
				  if (gname === undefined) {
					  continue;
				  } else {
					  if (aggregates[pname][gname] === undefined) {
						  aggregates[pname][gname] = {};							  
						  aggregates[pname][gname]['totalEvents'] = 0;							  
						  aggregates[pname][gname]['totalAnomalyScore'] = 0;							  
						  aggregates[pname][gname]['totalAnomalyCount'] = 0;							  
						  aggregates[pname][gname]['totalEventDuration'] = 0;							  
						  aggregates[pname][gname]['totalDurationEvents'] = 0;							  
					  }
					  //console.log(gname);
					  for (var hour in jsonResponse['data'][pname][gname]) {
						  if (hour == undefined || hour == "") {
							  continue;
						  } else {
							  if (aggregates[hour] === undefined) {
								  aggregates[hour] = {};							  
								  aggregates[hour]['totalEvents'] = 0;							  
								  aggregates[hour]['totalAnomalyScore'] = 0;							  
								  aggregates[hour]['totalAnomalyCount'] = 0;
								  aggregates[hour]['totalEventDuration'] = 0;							  
								  aggregates[hour]['totalDurationEvents'] = 0;							  
							  }
							  if (aggregates[pname][hour] === undefined) {
								  aggregates[pname][hour] = {};							  
								  aggregates[pname][hour]['totalEvents'] = 0;							  
								  aggregates[pname][hour]['totalAnomalyScore'] = 0;							  
								  aggregates[pname][hour]['totalAnomalyCount'] = 0;							  
								  aggregates[pname][hour]['totalEventDuration'] = 0;							  
								  aggregates[pname][hour]['totalDurationEvents'] = 0;							  
							  }
							  if (aggregates[pname][gname][hour] === undefined) {
								  aggregates[pname][gname][hour] = {};							  
								  aggregates[pname][gname][hour]['totalEvents'] = 0;							  
								  aggregates[pname][gname][hour]['totalAnomalyScore'] = 0;							  
								  aggregates[pname][gname][hour]['totalAnomalyCount'] = 0;							  
								  aggregates[pname][gname][hour]['totalEventDuration'] = 0;							  
								  aggregates[pname][gname][hour]['totalDurationEvents'] = 0;							  
							  }
						  }
						  //console.log(hour);
						  
						  // Fields
						  // Aggregate Totals
						  aggregates['totalEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfEvents'];
						  // console.log("aggTotalEvents: "+aggregates['totalEvents']);
						  aggregates['totalAnomalyScore'] += jsonResponse['data'][pname][gname][hour]['totalAnomalyScore'];
						  aggregates['totalAnomalyCount'] += jsonResponse['data'][pname][gname][hour]['numberOfAnomalies'];
						  aggregates['totalEventDuration'] += jsonResponse['data'][pname][gname][hour]['totalEventDuration'];
						  aggregates['totalDurationEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfDurationEvents'];
						  // Aggregate/Hour Totals
						  aggregates[hour]['totalEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfEvents'];
						  aggregates[hour]['totalAnomalyScore'] += jsonResponse['data'][pname][gname][hour]['totalAnomalyScore'];
						  aggregates[hour]['totalAnomalyCount'] += jsonResponse['data'][pname][gname][hour]['numberOfAnomalies'];
						  aggregates[hour]['totalEventDuration'] += jsonResponse['data'][pname][gname][hour]['totalEventDuration'];
						  aggregates[hour]['totalDurationEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfDurationEvents'];
						  // Project Totals
						  aggregates[pname]['totalEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfEvents'];
						  aggregates[pname]['totalAnomalyScore'] += jsonResponse['data'][pname][gname][hour]['totalAnomalyScore'];
						  aggregates[pname]['totalAnomalyCount'] += jsonResponse['data'][pname][gname][hour]['numberOfAnomalies'];
						  aggregates[pname]['totalEventDuration'] += jsonResponse['data'][pname][gname][hour]['totalEventDuration'];
						  aggregates[pname]['totalDurationEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfDurationEvents'];
						  // Project/Hour Totals
						  aggregates[pname][hour]['totalEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfEvents'];
						  aggregates[pname][hour]['totalAnomalyScore'] += jsonResponse['data'][pname][gname][hour]['totalAnomalyScore'];
						  aggregates[pname][hour]['totalAnomalyCount'] += jsonResponse['data'][pname][gname][hour]['numberOfAnomalies'];
						  aggregates[pname][hour]['totalEventDuration'] += jsonResponse['data'][pname][gname][hour]['totalEventDuration'];
						  aggregates[pname][hour]['totalDurationEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfDurationEvents'];
						  // Group Totals
						  aggregates[pname][gname]['totalEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfEvents'];
						  aggregates[pname][gname]['totalAnomalyScore'] += jsonResponse['data'][pname][gname][hour]['totalAnomalyScore'];
						  aggregates[pname][gname]['totalAnomalyCount'] += jsonResponse['data'][pname][gname][hour]['numberOfAnomalies'];
						  aggregates[pname][gname]['totalEventDuration'] += jsonResponse['data'][pname][gname][hour]['totalEventDuration'];
						  aggregates[pname][gname]['totalDurationEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfDurationEvents'];
					  }  // hour
				  }  
			  }  // gname
		  }
	  }  // pname
  }	// "success" 

  // Declare fields/variables for the heatmap grid
  let 	dayCtr = 1,
  		periodCtr = 1,
  		hourCtr = 1,
  		dateKey = "",
  		tempEvents = 0,
  		tempCount = 0,
  		tempScore = 0,
  		tempDuration = 0,
  		entry = {},
  		cell = {};
  aggregates['heatmap'] = [];

  for (var i = earliestViewHour+viewMillisOffset;i<(earliestViewHour+(durationInDays * millisInDay));i=i+3600000)  {
	  console.log('evh: '+earliestViewHour);
	  entry = new Date(i);
	  dateKey = dateFormatter(entry);
	  
	  // Add hour values to period totals
	  if (aggregates[dateKey] !== undefined) {
		  tempEvents += aggregates[dateKey]['totalEvents'];
		  tempCount += aggregates[dateKey]['totalAnomalyCount'];
		  tempScore += aggregates[dateKey]['totalAnomalyScore'];
		  tempDuration += aggregates[dateKey]['totalEventDuration'];
		  tempDurationEvents += aggregates[dateKey]['totalDurationEvents'];
	  }

	  if (hourCtr % periodInHours == 0) {

		  aggregates['heatmap'].push({'day':dayCtr, 'period':periodCtr, 'value': tempScore, 'totalEvents':tempEvents,
				  						'totalAnomalyCount':tempCount, 'totalAnomalyScore': tempScore,
				  						'totalEventDuration':tempDuration, 'totalDurationEvents':tempDurationEvents, 'title':""});
		  hourCtr = 1;
		  tempEvents = 0;
		  tempCount = 0;
		  tempScore = 0;
		  tempDuration = 0;
		  periodCtr++;
		  if (periodCtr > (24 / periodInHours)) {
			  periodCtr = 1;
			  dayCtr++;
			  aggregates['dayLabels'].push(entry.getMonth()+"/"+entry.getDate());
		  }
      } else {
    	  hourCtr++;
      }
  }
  console.log("aggregates['heatmap']: "+aggregates['heatmap']);
  
  return aggregates;
}


export default aggregateToMultiHourData;
