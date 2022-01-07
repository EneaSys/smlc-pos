ng build --base-href /app/

rsync -avz -e 'ssh -p 15468' dist/code-bar/ eneasys@soyhost1.cloud.eneasys.net:/home/eneasys/smlc.eneasys.com/public_html/app

rsync -avz -e 'ssh -p 15468' dist/code-bar/ stepobiz@soyhost1.cloud.eneasys.net:/web/stepobiz/bs.stepo.biz/public_html/app