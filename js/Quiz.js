class Quiz {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){

    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz
    if(gameState===2){
    fill("red");
    textSize(30);
    text("result of quiz",340,50);
    text("______________",320,65);
    }
    
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    if(allContestants !== undefined){
      var display_ans=230;
      fill("blue");
      textSize(20)
      text("*NOTE: contstant who answered correct are highlighted in green color!",160,330);
    }

    //for(var plr in allContestants){
      //var correctAns="2";
     // if(correctAns === allContestants[plr].answer){
     //   fill("green");
     // }else{
     //   fill("red");
      //}
      //display_ans+=30;
     // textSize(20);
     // text(allContestants[plr].name+":"+allContestants[plr].answer,250,display_ans);
    //}
      //question.hide();
      for(var plr in allContestants){
        var correctAns="2";
        if(correctAns === allContestants[plr].answer){
          fill("green");
        }else{
          fill("red");
        }
        display_ans+=30;
        textSize(20);
        text(allContestants[plr].name+" : "+allContestants[plr].answer,250,display_ans);
      }
  }

}
