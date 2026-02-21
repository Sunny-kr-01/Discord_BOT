module.exports={
    name:'say',
    description:'Repeats sentence',
    usage:'!say <message>',
    args:true,
    execute(message,args){
        message.channel.send(args.join(' '));
    }
}