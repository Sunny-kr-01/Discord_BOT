module.exports={
    name:'add',
    description:'adds the values provided',
    usage:'!add <num1> <num2> ...',
    args:true,
    execute(message,args){
        let sum = 0;
        for (let i = 0; i < args.length; i++) {
            sum += parseInt(args[i]);
        }
        message.reply(`The sum is ${sum}`);
    }    
}