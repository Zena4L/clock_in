import app from '../app';
import mongoose, {ConnectOptions}  from 'mongoose';
import cron from 'node-cron';
import { ClockIn } from '../model/clockInModel';

class Server{
    private readonly port:number;
    private readonly dURL:string;
    constructor(port:number,dURL:string){
        this.port = port;
        this.dURL = dURL;
    }
    public start():void{

        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const year = currentDate.getFullYear().toString().slice(-2); 

        const dbName = `clockins-${month}-${day}-${year}`;

        process.on('uncaughtException', (err:Error) => {
            console.log('Uncaught exceptions...server shutting down 1..2..3');
            console.log(err.name, err.message);
          });
          
          process.on('unhandledRejection', (err: Error) => {
            console.log('Uncaught exceptions...server shutting down 1..2..3');
            console.log(err.name, err.message);
          });
          
         
          const options:ConnectOptions={
              useNewUrlParser: true,
              useCreateIndex: true,
              useFindAndModify: false,
          }
          
          mongoose.connect(this.dURL+dbName,options).then(() => {
            cron.schedule('0 0 * * 1-5', async () => {
              try {
                // Create a new document for the current day
                const newDocument = await ClockIn.create({
                  name: dbName,
                  visitors: []
                });
        
                console.log('New document created:', newDocument);
              } catch (error) {
                console.error('Error creating document:', error);
              }
            });
          });
      
          app.listen(this.port, () => {
            console.log(`server is live on port ${this.port}`);
          });
          
    }
}

export default Server;