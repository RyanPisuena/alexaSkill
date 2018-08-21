// Lambda Function code for Alexa.
// Paste this into your index.js file. 

const Alexa = require("ask-sdk");
const https = require("https");



const invocationName = "scorerunner";

// Session Attributes 
//   Alexa will track attributes for you, by default only during the lifespan of your session.
//   The history[] array will track previous request(s), used for contextual Help/Yes/No handling.
//   Set up DynamoDB persistence to have the skill save and reload these attributes between skill sessions.

function getMemoryAttributes() {   const memoryAttributes = {
       "history":[],


       "launchCount":0,
       "lastUseTimestamp":0,

       "lastSpeechOutput":{},
       // "nextIntent":[]

       // "favoriteColor":"",
       // "name":"",
       // "namePronounce":"",
       // "email":"",
       // "mobileNumber":"",
       // "city":"",
       // "state":"",
       // "postcode":"",
       // "birthday":"",
       // "bookmark":0,
       // "wishlist":[],
   };
   return memoryAttributes;
};

const maxHistorySize = 20; // remember only latest 20 intents 


// 1. Intent Handlers =============================================

const AddPlayerIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AddPlayerIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from AddPlayerIntent. ';

        let slotStatus = '';
        let resolvedSlot;

        let slotValues = getSlotValues(request.intent.slots); 
        // getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions

        // console.log('***** slotValues: ' +  JSON.stringify(slotValues, null, 2));
        //   SLOT: PlayerName 
        if (slotValues.PlayerName.heardAs && slotValues.PlayerName.heardAs !== '') {
            slotStatus += ' slot PlayerName was heard as ' + slotValues.PlayerName.heardAs + '. ';
        } else {
            slotStatus += 'slot PlayerName is empty. ';
        }
        if (slotValues.PlayerName.ERstatus === 'ER_SUCCESS_MATCH') {
            slotStatus += 'a valid ';
            if(slotValues.PlayerName.resolved !== slotValues.PlayerName.heardAs) {
                slotStatus += 'synonym for ' + slotValues.PlayerName.resolved + '. '; 
                } else {
                slotStatus += 'match. '
            } // else {
                //
        }
        if (slotValues.PlayerName.ERstatus === 'ER_SUCCESS_NO_MATCH') {
            slotStatus += 'which did not match any slot value. ';
            console.log('***** consider adding "' + slotValues.PlayerName.heardAs + '" to the custom slot type used by slot PlayerName! '); 
        }

        if( (slotValues.PlayerName.ERstatus === 'ER_SUCCESS_NO_MATCH') ||  (!slotValues.PlayerName.heardAs) ) {
           // slotStatus += 'A few valid values are, ' + sayArray(getExampleSlotValues('AddPlayerIntent','PlayerName'), 'or');
        }

        say += slotStatus;


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AddScoreIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AddScoreIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from AddScoreIntent. ';

        let slotStatus = '';
        let resolvedSlot;

        let slotValues = getSlotValues(request.intent.slots); 
        // getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions

        // console.log('***** slotValues: ' +  JSON.stringify(slotValues, null, 2));
        //   SLOT: PlayerName 
        if (slotValues.PlayerName.heardAs && slotValues.PlayerName.heardAs !== '') {
            slotStatus += ' slot PlayerName was heard as ' + slotValues.PlayerName.heardAs + '. ';
        } else {
            slotStatus += 'slot PlayerName is empty. ';
        }
        if (slotValues.PlayerName.ERstatus === 'ER_SUCCESS_MATCH') {
            slotStatus += 'a valid ';
            if(slotValues.PlayerName.resolved !== slotValues.PlayerName.heardAs) {
                slotStatus += 'synonym for ' + slotValues.PlayerName.resolved + '. '; 
                } else {
                slotStatus += 'match. '
            } // else {
                //
        }
        if (slotValues.PlayerName.ERstatus === 'ER_SUCCESS_NO_MATCH') {
            slotStatus += 'which did not match any slot value. ';
            console.log('***** consider adding "' + slotValues.PlayerName.heardAs + '" to the custom slot type used by slot PlayerName! '); 
        }

        if( (slotValues.PlayerName.ERstatus === 'ER_SUCCESS_NO_MATCH') ||  (!slotValues.PlayerName.heardAs) ) {
           // slotStatus += 'A few valid values are, ' + sayArray(getExampleSlotValues('AddScoreIntent','PlayerName'), 'or');
        }
        //   SLOT: ScoreNumber 
        if (slotValues.ScoreNumber.heardAs && slotValues.ScoreNumber.heardAs !== '') {
            slotStatus += ' slot ScoreNumber was heard as ' + slotValues.ScoreNumber.heardAs + '. ';
        } else {
            slotStatus += 'slot ScoreNumber is empty. ';
        }
        if (slotValues.ScoreNumber.ERstatus === 'ER_SUCCESS_MATCH') {
            slotStatus += 'a valid ';
            if(slotValues.ScoreNumber.resolved !== slotValues.ScoreNumber.heardAs) {
                slotStatus += 'synonym for ' + slotValues.ScoreNumber.resolved + '. '; 
                } else {
                slotStatus += 'match. '
            } // else {
                //
        }
        if (slotValues.ScoreNumber.ERstatus === 'ER_SUCCESS_NO_MATCH') {
            slotStatus += 'which did not match any slot value. ';
            console.log('***** consider adding "' + slotValues.ScoreNumber.heardAs + '" to the custom slot type used by slot ScoreNumber! '); 
        }

        if( (slotValues.ScoreNumber.ERstatus === 'ER_SUCCESS_NO_MATCH') ||  (!slotValues.ScoreNumber.heardAs) ) {
           // slotStatus += 'A few valid values are, ' + sayArray(getExampleSlotValues('AddScoreIntent','ScoreNumber'), 'or');
        }

        say += slotStatus;


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_CancelIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.CancelIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();


        let say = 'Okay, talk to you later! ';

        return responseBuilder
            .speak(say)
            .withShouldEndSession(true)
            .getResponse();
    },
};

const AMAZON_HelpIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let history = sessionAttributes['history'];
        let intents = getCustomIntents();
        let sampleIntent = randomElement(intents);

        let say = 'You asked for help. '; 

        let previousIntent = getPreviousIntent(sessionAttributes);
        if (previousIntent && !handlerInput.requestEnvelope.session.new) {
             say += 'Your last intent was ' + previousIntent + '. ';
         }
        // say +=  'I understand  ' + intents.length + ' intents, '

        say += ' Here something you can ask me, ' + getSampleUtterance(sampleIntent);

        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_StopIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.StopIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();


        let say = 'Okay, talk to you later! ';

        return responseBuilder
            .speak(say)
            .withShouldEndSession(true)
            .getResponse();
    },
};

const NewGameIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'NewGameIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from NewGameIntent. ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const ResetPlayersIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'ResetPlayersIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from ResetPlayersIntent. ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const TellScoresIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'TellScoresIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from TellScoresIntent. ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_MoreIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.MoreIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from AMAZON.MoreIntent. ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_NavigateHomeIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NavigateHomeIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from AMAZON.NavigateHomeIntent. ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_NavigateSettingsIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NavigateSettingsIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from AMAZON.NavigateSettingsIntent. ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_NextIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NextIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from AMAZON.NextIntent. ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_PageUpIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.PageUpIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from AMAZON.PageUpIntent. ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_PageDownIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.PageDownIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from AMAZON.PageDownIntent. ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_PreviousIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.PreviousIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from AMAZON.PreviousIntent. ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_ScrollRightIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.ScrollRightIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from AMAZON.ScrollRightIntent. ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_ScrollDownIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.ScrollDownIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from AMAZON.ScrollDownIntent. ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_ScrollLeftIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.ScrollLeftIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from AMAZON.ScrollLeftIntent. ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_ScrollUpIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.ScrollUpIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from AMAZON.ScrollUpIntent. ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const LaunchRequest_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        let say = 'hello' + ' and welcome to ' + invocationName + ' ! Say help to hear some options.';

        let skillTitle = capitalize(invocationName);

        if (supportsDisplay(handlerInput)) {
            const myImage1 = new Alexa.ImageHelper()
               .addImageInstance(DisplayImg1.url)
               .getImage();

            const myImage2 = new Alexa.ImageHelper()
               .addImageInstance(DisplayImg2.url)
               .getImage();

            const primaryText = new Alexa.RichTextContentHelper()
               .withPrimaryText('Welcome to the skill!')
               .getTextContent();

            responseBuilder.addRenderTemplateDirective({
               type : 'BodyTemplate2',
               token : 'string',
               backButton : 'HIDDEN',
               backgroundImage: myImage2,
               image: myImage1,
               title: skillTitle,
               textContent: primaryText,
             });
        }

        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .withStandardCard('Welcome!', 
              'Hello!\nThis is a card for your skill, ' + skillTitle,
               welcomeCardImg.smallImageUrl, welcomeCardImg.largeImageUrl)
            .getResponse();
    },
};

const SessionEndedHandler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler =  {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const request = handlerInput.requestEnvelope.request;

        console.log(`Error handled: ${error.message}`);
        // console.log(`Original Request was: ${JSON.stringify(request, null, 2)}`);

        return handlerInput.responseBuilder
            .speak(`Sorry, your skill got this error.  ${error.message} `)
            .reprompt(`Sorry, your skill got this error.  ${error.message} `)
            .getResponse();
    }
};


// 2. Constants ===========================================================================

    // Here you can define static data, to be used elsewhere in your code.  For example: 
    //    const myString = "Hello World";
    //    const myArray  = [ "orange", "grape", "strawberry" ];
    //    const myObject = { "city": "Boston",  "state":"Massachusetts" };

const APP_ID = undefined;  // TODO replace with your Skill ID (OPTIONAL).

// 3.  Helper Functions ===================================================================

function capitalize(myString) {

     return myString.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }) ;
}

 
function randomElement(myArray) { 
    return(myArray[Math.floor(Math.random() * myArray.length)]); 
} 
 
function stripSpeak(str) { 
    return(str.replace('<speak>', '').replace('</speak>', '')); 
} 
 
 
 
 
function getSlotValues(filledSlots) { 
    const slotValues = {}; 
 
    Object.keys(filledSlots).forEach((item) => { 
        const name  = filledSlots[item].name; 
 
        if (filledSlots[item] && 
            filledSlots[item].resolutions && 
            filledSlots[item].resolutions.resolutionsPerAuthority[0] && 
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status && 
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) { 
            switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) { 
                case 'ER_SUCCESS_MATCH': 
                    slotValues[name] = { 
                        heardAs: filledSlots[item].value, 
                        resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name, 
                        ERstatus: 'ER_SUCCESS_MATCH' 
                    }; 
                    break; 
                case 'ER_SUCCESS_NO_MATCH': 
                    slotValues[name] = { 
                        heardAs: filledSlots[item].value, 
                        resolved: '', 
                        ERstatus: 'ER_SUCCESS_NO_MATCH' 
                    }; 
                    break; 
                default: 
                    break; 
            } 
        } else { 
            slotValues[name] = { 
                heardAs: filledSlots[item].value || '', // may be null 
                resolved: '', 
                ERstatus: '' 
            }; 
        } 
    }, this); 
 
    return slotValues; 
} 
 
function getExampleSlotValues(intentName, slotName) { 
 
    let examples = []; 
    let slotType = ''; 
    let slotValuesFull = []; 
 
    let intents = model.interactionModel.languageModel.intents; 
    for (let i = 0; i < intents.length; i++) { 
        if (intents[i].name == intentName) { 
            let slots = intents[i].slots; 
            for (let j = 0; j < slots.length; j++) { 
                if (slots[j].name === slotName) { 
                    slotType = slots[j].type; 
 
                } 
            } 
        } 
 
    } 
    let types = model.interactionModel.languageModel.types; 
    for (let i = 0; i < types.length; i++) { 
        if (types[i].name === slotType) { 
            slotValuesFull = types[i].values; 
        } 
    } 
 
    slotValuesFull = shuffleArray(slotValuesFull); 
 
    examples.push(slotValuesFull[0].name.value); 
    examples.push(slotValuesFull[1].name.value); 
    if (slotValuesFull.length > 2) { 
        examples.push(slotValuesFull[2].name.value); 
    } 
 
 
    return examples; 
} 
 
function sayArray(myData, penultimateWord = 'and') { 
    let result = ''; 
 
    myData.forEach(function(element, index, arr) { 
 
        if (index === 0) { 
            result = element; 
        } else if (index === myData.length - 1) { 
            result += ` ${penultimateWord} ${element}`; 
        } else { 
            result += `, ${element}`; 
        } 
    }); 
    return result; 
} 
function supportsDisplay(handlerInput) // returns true if the skill is running on a device with a display (Echo Show, Echo Spot, etc.) 
{                                      //  Enable your skill for display as shown here: https://alexa.design/enabledisplay 
    const hasDisplay = 
        handlerInput.requestEnvelope.context && 
        handlerInput.requestEnvelope.context.System && 
        handlerInput.requestEnvelope.context.System.device && 
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces && 
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display; 
 
    return hasDisplay; 
} 
 
 
const welcomeCardImg = { 
    smallImageUrl: "https://s3.amazonaws.com/skill-images-789/cards/card_plane720_480.png", 
    largeImageUrl: "https://s3.amazonaws.com/skill-images-789/cards/card_plane1200_800.png" 
 
 
}; 
 
const DisplayImg1 = { 
    title: 'Jet Plane', 
    url: 'https://s3.amazonaws.com/skill-images-789/display/plane340_340.png' 
}; 
const DisplayImg2 = { 
    title: 'Starry Sky', 
    url: 'https://s3.amazonaws.com/skill-images-789/display/background1024_600.png' 
 
}; 
 
function getCustomIntents() { 
    const modelIntents = model.interactionModel.languageModel.intents; 
 
    let customIntents = []; 
 
 
    for (let i = 0; i < modelIntents.length; i++) { 
 
        if(modelIntents[i].name.substring(0,7) != "AMAZON." && modelIntents[i].name !== "LaunchRequest" ) { 
            customIntents.push(modelIntents[i]); 
        } 
    } 
    return customIntents; 
} 
 
function getSampleUtterance(intent) { 
 
    return randomElement(intent.samples); 
 
} 
 
function getPreviousIntent(attrs) { 
 
    if (attrs.history && attrs.history.length > 1) { 
        return attrs.history[attrs.history.length - 2].IntentRequest; 
 
    } else { 
        return false; 
    } 
 
} 
 
function getPreviousSpeechOutput(attrs) { 
 
    if (attrs.lastSpeechOutput && attrs.history.length > 1) { 
        return attrs.lastSpeechOutput; 
 
    } else { 
        return false; 
    } 
 
} 
 
function timeDelta(t1, t2) { 
 
    const dt1 = new Date(t1); 
    const dt2 = new Date(t2); 
    const timeSpanMS = dt2.getTime() - dt1.getTime(); 
    const span = { 
        "timeSpanMIN": Math.floor(timeSpanMS / (1000 * 60 )), 
        "timeSpanHR": Math.floor(timeSpanMS / (1000 * 60 * 60)), 
        "timeSpanDAY": Math.floor(timeSpanMS / (1000 * 60 * 60 * 24)), 
        "timeSpanDesc" : "" 
    }; 
 
 
    if (span.timeSpanHR < 2) { 
        span.timeSpanDesc = span.timeSpanMIN + " minutes"; 
    } else if (span.timeSpanDAY < 2) { 
        span.timeSpanDesc = span.timeSpanHR + " hours"; 
    } else { 
        span.timeSpanDesc = span.timeSpanDAY + " days"; 
    } 
 
 
    return span; 
 
} 
 
 
const InitMemoryAttributesInterceptor = { 
    process(handlerInput) { 
        let sessionAttributes = {}; 
        if(handlerInput.requestEnvelope.session['new']) { 
 
            sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
 
            let memoryAttributes = getMemoryAttributes(); 
 
            if(Object.keys(sessionAttributes).length === 0) { 
 
                Object.keys(memoryAttributes).forEach(function(key) {  // initialize all attributes from global list 
 
                    sessionAttributes[key] = memoryAttributes[key]; 
 
                }); 
 
            } 
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
 
        } 
    } 
}; 
 
const RequestHistoryInterceptor = { 
    process(handlerInput) { 
 
        const thisRequest = handlerInput.requestEnvelope.request; 
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
 
        let history = sessionAttributes['history'] || []; 
 
        let IntentRequest = {}; 
        if (thisRequest.type === 'IntentRequest' ) { 
 
            let slots = []; 
 
            IntentRequest = { 
                'IntentRequest' : thisRequest.intent.name 
            }; 
 
            if (thisRequest.intent.slots) { 
 
                for (let slot in thisRequest.intent.slots) { 
                    let slotObj = {}; 
                    slotObj[slot] = thisRequest.intent.slots[slot].value; 
                    slots.push(slotObj); 
                } 
 
                IntentRequest = { 
                    'IntentRequest' : thisRequest.intent.name, 
                    'slots' : slots 
                }; 
 
            } 
 
        } else { 
            IntentRequest = {'IntentRequest' : thisRequest.type}; 
        } 
        if(history.length > maxHistorySize - 1) { 
            history.shift(); 
        } 
        history.push(IntentRequest); 
 
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
    } 
 
}; 
 
 
 
 
const RequestPersistenceInterceptor = { 
    process(handlerInput) { 
 
        if(handlerInput.requestEnvelope.session['new']) { 
 
            return new Promise((resolve, reject) => { 
 
                handlerInput.attributesManager.getPersistentAttributes() 
 
                    .then((sessionAttributes) => { 
                        sessionAttributes = sessionAttributes || {}; 
 
 
                        sessionAttributes['launchCount'] += 1; 
 
                        handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
                        handlerInput.attributesManager.savePersistentAttributes() 
                            .then(() => { 
                                resolve(); 
                            }) 
                            .catch((err) => { 
                                reject(err); 
                            }); 
                    }); 
 
            }); 
 
        } // end session['new'] 
    } 
}; 
 
 
const ResponseRecordSpeechOutputInterceptor = { 
    process(handlerInput, responseOutput) { 
 
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
        let lastSpeechOutput = { 
            "outputSpeech":responseOutput.outputSpeech.ssml, 
            "reprompt":responseOutput.reprompt.outputSpeech.ssml 
        }; 
 
        sessionAttributes['lastSpeechOutput'] = lastSpeechOutput; 
 
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
    } 
}; 
 
const ResponsePersistenceInterceptor = { 
    process(handlerInput, responseOutput) { 
 
        const ses = (typeof responseOutput.shouldEndSession == "undefined" ? true : responseOutput.shouldEndSession); 
 
        if(ses || handlerInput.requestEnvelope.request.type == 'SessionEndedRequest') { // skill was stopped or timed out 
 
            let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
 
            sessionAttributes['lastUseTimestamp'] = new Date(handlerInput.requestEnvelope.request.timestamp).getTime(); 
 
            handlerInput.attributesManager.setPersistentAttributes(sessionAttributes); 
 
            return new Promise((resolve, reject) => { 
                handlerInput.attributesManager.savePersistentAttributes() 
                    .then(() => { 
                        resolve(); 
                    }) 
                    .catch((err) => { 
                        reject(err); 
                    }); 
 
            }); 
 
        } 
 
    } 
}; 
 
 
function shuffleArray(array) {  // Fisher Yates shuffle! 
 
    let currentIndex = array.length, temporaryValue, randomIndex; 
 
    while (0 !== currentIndex) { 
 
        randomIndex = Math.floor(Math.random() * currentIndex); 
        currentIndex -= 1; 
 
        temporaryValue = array[currentIndex]; 
        array[currentIndex] = array[randomIndex]; 
        array[randomIndex] = temporaryValue; 
    } 
 
    return array; 
} 
// 4. Exports handler function and setup ===================================================
const skillBuilder = Alexa.SkillBuilders.standard();
exports.handler = skillBuilder
    .addRequestHandlers(
        AddPlayerIntent_Handler, 
        AddScoreIntent_Handler, 
        AMAZON_CancelIntent_Handler, 
        AMAZON_HelpIntent_Handler, 
        AMAZON_StopIntent_Handler, 
        NewGameIntent_Handler, 
        ResetPlayersIntent_Handler, 
        TellScoresIntent_Handler, 
        AMAZON_MoreIntent_Handler, 
        AMAZON_NavigateHomeIntent_Handler, 
        AMAZON_NavigateSettingsIntent_Handler, 
        AMAZON_NextIntent_Handler, 
        AMAZON_PageUpIntent_Handler, 
        AMAZON_PageDownIntent_Handler, 
        AMAZON_PreviousIntent_Handler, 
        AMAZON_ScrollRightIntent_Handler, 
        AMAZON_ScrollDownIntent_Handler, 
        AMAZON_ScrollLeftIntent_Handler, 
        AMAZON_ScrollUpIntent_Handler, 
        LaunchRequest_Handler, 
        SessionEndedHandler
    )
    .addErrorHandlers(ErrorHandler)
    .addRequestInterceptors(InitMemoryAttributesInterceptor)
    .addRequestInterceptors(RequestHistoryInterceptor)

   // .addResponseInterceptors(ResponseRecordSpeechOutputInterceptor)

 // .addRequestInterceptors(RequestPersistenceInterceptor)
 // .addResponseInterceptors(ResponsePersistenceInterceptor)

 // .withTableName("askMemorySkillTable")
 // .withAutoCreateTable(true)

    .lambda();


// End of Skill code -------------------------------------------------------------
// Static Language Model for reference

const model = {
  "interactionModel": {
    "languageModel": {
      "invocationName": "scorerunner",
      "intents": [
        {
          "name": "AddPlayerIntent",
          "slots": [
            {
              "name": "PlayerName",
              "type": "LIST_OF_PLAYER_NAMES"
            }
          ],
          "samples": [
            "add player {PlayerName}",
            "add {PlayerName}",
            "add {PlayerName} to the game",
            "add player {PlayerName} to the game",
            "{PlayerName}"
          ]
        },
        {
          "name": "AddScoreIntent",
          "slots": [
            {
              "name": "PlayerName",
              "type": "LIST_OF_PLAYER_NAMES"
            },
            {
              "name": "ScoreNumber",
              "type": "AMAZON.NUMBER"
            }
          ],
          "samples": [
            "give {PlayerName} {ScoreNumber}",
            "give {PlayerName} {ScoreNumber} points",
            "{ScoreNumber} more for {PlayerName}",
            "{ScoreNumber} for {PlayerName}",
            "give {PlayerName} {ScoreNumber} more points",
            "{ScoreNumber} more points for {PlayerName}",
            "{ScoreNumber} points for {PlayerName}"
          ]
        },
        {
          "name": "AMAZON.CancelIntent",
          "samples": []
        },
        {
          "name": "AMAZON.HelpIntent",
          "samples": []
        },
        {
          "name": "AMAZON.StopIntent",
          "samples": [
            "exit",
            "stop game",
            "exit game",
            "stop the game"
          ]
        },
        {
          "name": "NewGameIntent",
          "slots": [],
          "samples": [
            "begin a game",
            "begin a new game",
            "begin game",
            "begin new game",
            "create a game",
            "create a new game",
            "create game",
            "create new game",
            "do a game",
            "do a new game",
            "do game",
            "do new game",
            "make a game",
            "make a new game",
            "make game",
            "make new game",
            "new game",
            "open a game",
            "open a new game",
            "open game",
            "open new game",
            "restart",
            "restart game",
            "set up a game",
            "set up a new game",
            "set up game",
            "set up new game",
            "begin score",
            "create score",
            "do score",
            "make score",
            "open score",
            "set up score",
            "start a game"
          ]
        },
        {
          "name": "ResetPlayersIntent",
          "slots": [],
          "samples": [
            "clear",
            "clear a game",
            "clear game",
            "clear points",
            "clear numbers",
            "clear score",
            "clear last game",
            "clear last participants",
            "clear last players",
            "clear last points",
            "clear last numbers",
            "clear last score",
            "clear my players",
            "clear my game",
            "clear my participants",
            "clear my points",
            "clear my numbers",
            "clear my score",
            "clear old game",
            "clear old participants",
            "clear old players",
            "clear old points",
            "clear old numbers",
            "clear old score",
            "clear our game",
            "clear our participants",
            "clear our players",
            "clear our points",
            "clear our numbers",
            "clear our score",
            "clear participants",
            "clear past game",
            "clear past participants",
            "clear past players",
            "clear past points",
            "clear past numbers",
            "clear past score",
            "clear players",
            "clear that game",
            "clear that score",
            "clear the game",
            "clear the participants",
            "clear the players",
            "clear the points",
            "clear the numbers",
            "clear the score",
            "clear those participants",
            "clear those players",
            "clear those points",
            "clear those numbers",
            "delete",
            "delete a game",
            "delete game",
            "delete points",
            "delete numbers",
            "delete score",
            "delete last game",
            "delete last participants",
            "delete last players",
            "delete last points",
            "delete last numbers",
            "delete last score",
            "delete my players",
            "delete my game",
            "delete my participants",
            "delete my points",
            "delete my numbers",
            "delete my score",
            "delete old game",
            "delete old participants",
            "delete old players",
            "delete old points",
            "delete old numbers",
            "delete old score",
            "delete our game",
            "delete our participants",
            "delete our players",
            "delete our points",
            "delete our numbers",
            "delete our score",
            "delete participants",
            "delete past game",
            "delete past participants",
            "delete past players",
            "delete past points",
            "delete past numbers",
            "delete past score",
            "delete players",
            "delete that game",
            "delete that score",
            "delete the game",
            "delete the participants",
            "delete the players",
            "delete the points",
            "delete the numbers",
            "delete the score",
            "delete those participants",
            "delete those players",
            "delete those points",
            "delete those numbers",
            "erase",
            "erase a game",
            "erase game",
            "erase points",
            "erase numbers",
            "erase score",
            "erase last game",
            "erase last participants",
            "erase last players",
            "erase last points",
            "erase last numbers",
            "erase last score",
            "erase my players",
            "erase my game",
            "erase my participants",
            "erase my points",
            "erase my numbers",
            "erase my score",
            "erase old game",
            "erase old participants",
            "erase old players",
            "erase old points",
            "erase old numbers",
            "erase old score",
            "erase our game",
            "erase our participants",
            "erase our players",
            "erase our points",
            "erase our numbers",
            "erase our score",
            "erase participants",
            "erase past game",
            "erase past participants",
            "erase past players",
            "erase past points",
            "erase past numbers",
            "erase past score",
            "erase players",
            "erase that game",
            "erase that score",
            "erase the game",
            "erase the participants",
            "erase the players",
            "erase the points",
            "erase the numbers",
            "erase the score",
            "erase those participants",
            "erase those players",
            "erase those points",
            "erase those numbers",
            "forget",
            "forget a game",
            "forget game",
            "forget points",
            "forget numbers",
            "forget score",
            "forget last game",
            "forget last participants",
            "forget last players",
            "forget last points",
            "forget last numbers",
            "forget last score",
            "forget my players",
            "forget my game",
            "forget my participants",
            "forget my points",
            "forget my numbers",
            "forget my score",
            "forget old game",
            "forget old participants",
            "forget old players",
            "forget old points",
            "forget old numbers",
            "forget old score",
            "forget our game",
            "forget our participants",
            "forget our players",
            "forget our points",
            "forget our numbers",
            "forget our score",
            "forget participants",
            "forget past game",
            "forget past participants",
            "forget past players",
            "forget past points",
            "forget past numbers",
            "forget past score",
            "forget players",
            "forget that game",
            "forget that score",
            "forget the game",
            "forget the participants",
            "forget the players",
            "forget the points",
            "forget the numbers",
            "forget the score",
            "forget those participants",
            "forget those players",
            "forget those points",
            "forget those numbers",
            "remove",
            "remove a game",
            "remove game",
            "remove points",
            "remove numbers",
            "remove score",
            "remove last game",
            "remove last participants",
            "remove last players",
            "remove last points",
            "remove last numbers",
            "remove last score",
            "remove my players",
            "remove my game",
            "remove my participants",
            "remove my points",
            "remove my numbers",
            "remove my score",
            "remove old game",
            "remove old participants",
            "remove old players",
            "remove old points",
            "remove old numbers",
            "remove old score",
            "remove our game",
            "remove our participants",
            "remove our players",
            "remove our points",
            "remove our numbers",
            "remove our score",
            "remove participants",
            "remove past game",
            "remove past participants",
            "remove past players",
            "remove past points",
            "remove past numbers",
            "remove past score",
            "remove players",
            "remove that game",
            "remove that score",
            "remove the game",
            "remove the participants",
            "remove the players",
            "remove the points",
            "remove the numbers",
            "remove the score",
            "remove those participants",
            "remove those players",
            "remove those points",
            "remove those numbers",
            "reset",
            "reset a game",
            "reset game",
            "reset points",
            "reset numbers",
            "reset score",
            "reset last game",
            "reset last participants",
            "reset last players",
            "reset last points",
            "reset last numbers",
            "reset last score",
            "reset my players",
            "reset my game",
            "reset my participants",
            "reset my points",
            "reset my numbers",
            "reset my score",
            "reset old game",
            "reset old participants",
            "reset old players",
            "reset old points",
            "reset old numbers",
            "reset old score",
            "reset our game",
            "reset our participants",
            "reset our players",
            "reset our points",
            "reset our numbers",
            "reset our score",
            "reset participants",
            "reset past game",
            "reset past participants",
            "reset past players",
            "reset past points",
            "reset past numbers",
            "reset past score",
            "reset players",
            "reset that game",
            "reset that score",
            "reset the game",
            "reset the participants",
            "reset the players",
            "reset the points",
            "reset the numbers",
            "reset the score",
            "reset those participants",
            "reset those players",
            "reset those points",
            "reset those numbers",
            "wipe",
            "wipe a game",
            "wipe game",
            "wipe points",
            "wipe numbers",
            "wipe score",
            "wipe last game",
            "wipe last participants",
            "wipe last players",
            "wipe last points",
            "wipe last numbers",
            "wipe last score",
            "wipe my players",
            "wipe my game",
            "wipe my participants",
            "wipe my points",
            "wipe my numbers",
            "wipe my score",
            "wipe old game",
            "wipe old participants",
            "wipe old players",
            "wipe old points",
            "wipe old numbers",
            "wipe old score",
            "wipe our game",
            "wipe our participants",
            "wipe our players",
            "wipe our points",
            "wipe our numbers",
            "wipe our score",
            "wipe participants",
            "wipe past game",
            "wipe past participants",
            "wipe past players",
            "wipe past points",
            "wipe past numbers",
            "wipe past score",
            "wipe players",
            "wipe that game",
            "wipe that score",
            "wipe the game",
            "wipe the participants",
            "wipe the players",
            "wipe the points",
            "wipe the numbers",
            "wipe the score",
            "wipe those participants",
            "wipe those players",
            "wipe those points",
            "wipe those numbers"
          ]
        },
        {
          "name": "TellScoresIntent",
          "slots": [],
          "samples": [
            "first",
            "first place",
            "give me the numbers",
            "give me the scoreboard",
            "give us who is in the lead",
            "how do our scores look",
            "last",
            "last place",
            "leaderboard",
            "list current points",
            "loser",
            "numbers",
            "points",
            "rankings",
            "read the standing",
            "recite the points",
            "say the numbers",
            "share our current numbers",
            "standing",
            "state our standing",
            "state the winner",
            "tell me current score",
            "tell me the current score",
            "tell me the score",
            "tell us current score",
            "tell us the current score",
            "tell us the score",
            "tell us who's losing",
            "tell us who's winning",
            "the current score",
            "the ranking",
            "the score",
            "view points",
            "what is the score",
            "what points does everyone have",
            "what scores do everyone have",
            "what's the score",
            "which one of us is in first place",
            "which one of us is winning",
            "who is leading",
            "who's got the most points",
            "who's in the lead",
            "winner"
          ]
        },
        {
          "name": "AMAZON.MoreIntent",
          "samples": []
        },
        {
          "name": "AMAZON.NavigateHomeIntent",
          "samples": []
        },
        {
          "name": "AMAZON.NavigateSettingsIntent",
          "samples": []
        },
        {
          "name": "AMAZON.NextIntent",
          "samples": []
        },
        {
          "name": "AMAZON.PageUpIntent",
          "samples": []
        },
        {
          "name": "AMAZON.PageDownIntent",
          "samples": []
        },
        {
          "name": "AMAZON.PreviousIntent",
          "samples": []
        },
        {
          "name": "AMAZON.ScrollRightIntent",
          "samples": []
        },
        {
          "name": "AMAZON.ScrollDownIntent",
          "samples": []
        },
        {
          "name": "AMAZON.ScrollLeftIntent",
          "samples": []
        },
        {
          "name": "AMAZON.ScrollUpIntent",
          "samples": []
        },
        {
          "name": "LaunchRequest"
        }
      ],
      "types": [
        {
          "name": "LIST_OF_PLAYER_NAMES",
          "values": [
            {
              "name": {
                "value": "aaron"
              }
            },
            {
              "name": {
                "value": "abbie"
              }
            },
            {
              "name": {
                "value": "abby"
              }
            },
            {
              "name": {
                "value": "abe"
              }
            },
            {
              "name": {
                "value": "abigail"
              }
            },
            {
              "name": {
                "value": "abraham"
              }
            },
            {
              "name": {
                "value": "abram"
              }
            },
            {
              "name": {
                "value": "ada"
              }
            },
            {
              "name": {
                "value": "adaline"
              }
            },
            {
              "name": {
                "value": "adam"
              }
            },
            {
              "name": {
                "value": "addy"
              }
            },
            {
              "name": {
                "value": "agatha"
              }
            },
            {
              "name": {
                "value": "aggy"
              }
            },
            {
              "name": {
                "value": "agnes"
              }
            },
            {
              "name": {
                "value": "aileen"
              }
            },
            {
              "name": {
                "value": "al"
              }
            },
            {
              "name": {
                "value": "alan"
              }
            },
            {
              "name": {
                "value": "albert"
              }
            },
            {
              "name": {
                "value": "aldo"
              }
            },
            {
              "name": {
                "value": "aldrich"
              }
            },
            {
              "name": {
                "value": "alex"
              }
            },
            {
              "name": {
                "value": "alexander"
              }
            },
            {
              "name": {
                "value": "alexandra"
              }
            },
            {
              "name": {
                "value": "alfonse"
              }
            },
            {
              "name": {
                "value": "alfred"
              }
            },
            {
              "name": {
                "value": "alfreda"
              }
            },
            {
              "name": {
                "value": "alice"
              }
            },
            {
              "name": {
                "value": "alicia"
              }
            },
            {
              "name": {
                "value": "allan"
              }
            },
            {
              "name": {
                "value": "allen"
              }
            },
            {
              "name": {
                "value": "allie"
              }
            },
            {
              "name": {
                "value": "almena"
              }
            },
            {
              "name": {
                "value": "alonzo"
              }
            },
            {
              "name": {
                "value": "amanda"
              }
            },
            {
              "name": {
                "value": "amber"
              }
            },
            {
              "name": {
                "value": "amelia"
              }
            },
            {
              "name": {
                "value": "amy"
              }
            },
            {
              "name": {
                "value": "anderson"
              }
            },
            {
              "name": {
                "value": "andrea"
              }
            },
            {
              "name": {
                "value": "andrew"
              }
            },
            {
              "name": {
                "value": "andy"
              }
            },
            {
              "name": {
                "value": "angela"
              }
            },
            {
              "name": {
                "value": "ann"
              }
            },
            {
              "name": {
                "value": "anne"
              }
            },
            {
              "name": {
                "value": "annie"
              }
            },
            {
              "name": {
                "value": "anthony"
              }
            },
            {
              "name": {
                "value": "antoinette"
              }
            },
            {
              "name": {
                "value": "antonia"
              }
            },
            {
              "name": {
                "value": "ara"
              }
            },
            {
              "name": {
                "value": "arabella"
              }
            },
            {
              "name": {
                "value": "arabelle"
              }
            },
            {
              "name": {
                "value": "archibald"
              }
            },
            {
              "name": {
                "value": "archie"
              }
            },
            {
              "name": {
                "value": "arlene"
              }
            },
            {
              "name": {
                "value": "arly"
              }
            },
            {
              "name": {
                "value": "art"
              }
            },
            {
              "name": {
                "value": "arthur"
              }
            },
            {
              "name": {
                "value": "ashley"
              }
            },
            {
              "name": {
                "value": "augusta"
              }
            },
            {
              "name": {
                "value": "augustina"
              }
            },
            {
              "name": {
                "value": "augustine"
              }
            },
            {
              "name": {
                "value": "augustus"
              }
            },
            {
              "name": {
                "value": "babs"
              }
            },
            {
              "name": {
                "value": "barbara"
              }
            },
            {
              "name": {
                "value": "barbie"
              }
            },
            {
              "name": {
                "value": "barnabas"
              }
            },
            {
              "name": {
                "value": "barney"
              }
            },
            {
              "name": {
                "value": "bart"
              }
            },
            {
              "name": {
                "value": "bartholomew"
              }
            },
            {
              "name": {
                "value": "bea"
              }
            },
            {
              "name": {
                "value": "beatrice"
              }
            },
            {
              "name": {
                "value": "becca"
              }
            },
            {
              "name": {
                "value": "becky"
              }
            },
            {
              "name": {
                "value": "belinda"
              }
            },
            {
              "name": {
                "value": "bella"
              }
            },
            {
              "name": {
                "value": "belle"
              }
            },
            {
              "name": {
                "value": "ben"
              }
            },
            {
              "name": {
                "value": "benedict"
              }
            },
            {
              "name": {
                "value": "benjamin"
              }
            },
            {
              "name": {
                "value": "benjy"
              }
            },
            {
              "name": {
                "value": "bennie"
              }
            },
            {
              "name": {
                "value": "bernard"
              }
            },
            {
              "name": {
                "value": "berny"
              }
            },
            {
              "name": {
                "value": "bert"
              }
            },
            {
              "name": {
                "value": "bertha"
              }
            },
            {
              "name": {
                "value": "bess"
              }
            },
            {
              "name": {
                "value": "beth"
              }
            },
            {
              "name": {
                "value": "betsy"
              }
            },
            {
              "name": {
                "value": "betty"
              }
            },
            {
              "name": {
                "value": "bill"
              }
            },
            {
              "name": {
                "value": "billy"
              }
            },
            {
              "name": {
                "value": "birdie"
              }
            },
            {
              "name": {
                "value": "birtie"
              }
            },
            {
              "name": {
                "value": "bob"
              }
            },
            {
              "name": {
                "value": "bobbie"
              }
            },
            {
              "name": {
                "value": "bobby"
              }
            },
            {
              "name": {
                "value": "brad"
              }
            },
            {
              "name": {
                "value": "bradford"
              }
            },
            {
              "name": {
                "value": "brandon"
              }
            },
            {
              "name": {
                "value": "brian"
              }
            },
            {
              "name": {
                "value": "brit"
              }
            },
            {
              "name": {
                "value": "brittany"
              }
            },
            {
              "name": {
                "value": "broderick"
              }
            },
            {
              "name": {
                "value": "brody"
              }
            },
            {
              "name": {
                "value": "cal"
              }
            },
            {
              "name": {
                "value": "calvin"
              }
            },
            {
              "name": {
                "value": "camile"
              }
            },
            {
              "name": {
                "value": "cammie"
              }
            },
            {
              "name": {
                "value": "carl"
              }
            },
            {
              "name": {
                "value": "carol"
              }
            },
            {
              "name": {
                "value": "carolann"
              }
            },
            {
              "name": {
                "value": "caroline"
              }
            },
            {
              "name": {
                "value": "carolyn"
              }
            },
            {
              "name": {
                "value": "cassandra"
              }
            },
            {
              "name": {
                "value": "cassie"
              }
            },
            {
              "name": {
                "value": "catherine"
              }
            },
            {
              "name": {
                "value": "cathleen"
              }
            },
            {
              "name": {
                "value": "cathy"
              }
            },
            {
              "name": {
                "value": "charles"
              }
            },
            {
              "name": {
                "value": "charlie"
              }
            },
            {
              "name": {
                "value": "chester"
              }
            },
            {
              "name": {
                "value": "chet"
              }
            },
            {
              "name": {
                "value": "chrintina"
              }
            },
            {
              "name": {
                "value": "chrintine"
              }
            },
            {
              "name": {
                "value": "chris"
              }
            },
            {
              "name": {
                "value": "christa"
              }
            },
            {
              "name": {
                "value": "christian"
              }
            },
            {
              "name": {
                "value": "christina"
              }
            },
            {
              "name": {
                "value": "christine"
              }
            },
            {
              "name": {
                "value": "christopher"
              }
            },
            {
              "name": {
                "value": "chuck"
              }
            },
            {
              "name": {
                "value": "cinderlla"
              }
            },
            {
              "name": {
                "value": "cindy"
              }
            },
            {
              "name": {
                "value": "clara"
              }
            },
            {
              "name": {
                "value": "clarissa"
              }
            },
            {
              "name": {
                "value": "cliff"
              }
            },
            {
              "name": {
                "value": "clifford"
              }
            },
            {
              "name": {
                "value": "clifton"
              }
            },
            {
              "name": {
                "value": "connie"
              }
            },
            {
              "name": {
                "value": "constance"
              }
            },
            {
              "name": {
                "value": "cornelius"
              }
            },
            {
              "name": {
                "value": "crissy"
              }
            },
            {
              "name": {
                "value": "crystal"
              }
            },
            {
              "name": {
                "value": "curt"
              }
            },
            {
              "name": {
                "value": "curtis"
              }
            },
            {
              "name": {
                "value": "cy"
              }
            },
            {
              "name": {
                "value": "cynthia"
              }
            },
            {
              "name": {
                "value": "cyrus"
              }
            },
            {
              "name": {
                "value": "dan"
              }
            },
            {
              "name": {
                "value": "daniel"
              }
            },
            {
              "name": {
                "value": "danielle"
              }
            },
            {
              "name": {
                "value": "danny"
              }
            },
            {
              "name": {
                "value": "darlene"
              }
            },
            {
              "name": {
                "value": "dave"
              }
            },
            {
              "name": {
                "value": "davey"
              }
            },
            {
              "name": {
                "value": "david"
              }
            },
            {
              "name": {
                "value": "deb"
              }
            },
            {
              "name": {
                "value": "debbie"
              }
            },
            {
              "name": {
                "value": "deborah"
              }
            },
            {
              "name": {
                "value": "debra"
              }
            },
            {
              "name": {
                "value": "dee"
              }
            },
            {
              "name": {
                "value": "del"
              }
            },
            {
              "name": {
                "value": "delbert"
              }
            },
            {
              "name": {
                "value": "della"
              }
            },
            {
              "name": {
                "value": "delores"
              }
            },
            {
              "name": {
                "value": "dennie"
              }
            },
            {
              "name": {
                "value": "dennis"
              }
            },
            {
              "name": {
                "value": "dennison"
              }
            },
            {
              "name": {
                "value": "denny"
              }
            },
            {
              "name": {
                "value": "derick"
              }
            },
            {
              "name": {
                "value": "dick"
              }
            },
            {
              "name": {
                "value": "dolly"
              }
            },
            {
              "name": {
                "value": "dom"
              }
            },
            {
              "name": {
                "value": "domenic"
              }
            },
            {
              "name": {
                "value": "dominico"
              }
            },
            {
              "name": {
                "value": "don"
              }
            },
            {
              "name": {
                "value": "donald"
              }
            },
            {
              "name": {
                "value": "donato"
              }
            },
            {
              "name": {
                "value": "donnie"
              }
            },
            {
              "name": {
                "value": "donny"
              }
            },
            {
              "name": {
                "value": "dora"
              }
            },
            {
              "name": {
                "value": "dorothy"
              }
            },
            {
              "name": {
                "value": "dot"
              }
            },
            {
              "name": {
                "value": "dottie"
              }
            },
            {
              "name": {
                "value": "dotty"
              }
            },
            {
              "name": {
                "value": "drew"
              }
            },
            {
              "name": {
                "value": "ed"
              }
            },
            {
              "name": {
                "value": "eddie"
              }
            },
            {
              "name": {
                "value": "eddy"
              }
            },
            {
              "name": {
                "value": "edgar"
              }
            },
            {
              "name": {
                "value": "edie"
              }
            },
            {
              "name": {
                "value": "edith"
              }
            },
            {
              "name": {
                "value": "edmond"
              }
            },
            {
              "name": {
                "value": "edmund"
              }
            },
            {
              "name": {
                "value": "eduardo"
              }
            },
            {
              "name": {
                "value": "edward"
              }
            },
            {
              "name": {
                "value": "edwin"
              }
            },
            {
              "name": {
                "value": "edye"
              }
            },
            {
              "name": {
                "value": "edyth"
              }
            },
            {
              "name": {
                "value": "edythe"
              }
            },
            {
              "name": {
                "value": "elaine"
              }
            },
            {
              "name": {
                "value": "elbert"
              }
            },
            {
              "name": {
                "value": "eldora"
              }
            },
            {
              "name": {
                "value": "eleanor"
              }
            },
            {
              "name": {
                "value": "elias"
              }
            },
            {
              "name": {
                "value": "elizabeth"
              }
            },
            {
              "name": {
                "value": "ella"
              }
            },
            {
              "name": {
                "value": "ellen"
              }
            },
            {
              "name": {
                "value": "elwood"
              }
            },
            {
              "name": {
                "value": "emeline"
              }
            },
            {
              "name": {
                "value": "emily"
              }
            },
            {
              "name": {
                "value": "emma"
              }
            },
            {
              "name": {
                "value": "eric"
              }
            },
            {
              "name": {
                "value": "erica"
              }
            },
            {
              "name": {
                "value": "erin"
              }
            },
            {
              "name": {
                "value": "estella"
              }
            },
            {
              "name": {
                "value": "eugene"
              }
            },
            {
              "name": {
                "value": "eve"
              }
            },
            {
              "name": {
                "value": "faith"
              }
            },
            {
              "name": {
                "value": "fay"
              }
            },
            {
              "name": {
                "value": "ferdinand"
              }
            },
            {
              "name": {
                "value": "flo"
              }
            },
            {
              "name": {
                "value": "flora"
              }
            },
            {
              "name": {
                "value": "florence"
              }
            },
            {
              "name": {
                "value": "fran"
              }
            },
            {
              "name": {
                "value": "frances"
              }
            },
            {
              "name": {
                "value": "francie"
              }
            },
            {
              "name": {
                "value": "francine"
              }
            },
            {
              "name": {
                "value": "francis"
              }
            },
            {
              "name": {
                "value": "frank"
              }
            },
            {
              "name": {
                "value": "frankie"
              }
            },
            {
              "name": {
                "value": "franklin"
              }
            },
            {
              "name": {
                "value": "frannie"
              }
            },
            {
              "name": {
                "value": "franny"
              }
            },
            {
              "name": {
                "value": "fred"
              }
            },
            {
              "name": {
                "value": "freda"
              }
            },
            {
              "name": {
                "value": "freddie"
              }
            },
            {
              "name": {
                "value": "freddy"
              }
            },
            {
              "name": {
                "value": "frederick"
              }
            },
            {
              "name": {
                "value": "fredericka"
              }
            },
            {
              "name": {
                "value": "frieda"
              }
            },
            {
              "name": {
                "value": "gabby"
              }
            },
            {
              "name": {
                "value": "gabe"
              }
            },
            {
              "name": {
                "value": "gabriel"
              }
            },
            {
              "name": {
                "value": "gabriella"
              }
            },
            {
              "name": {
                "value": "gabrielle"
              }
            },
            {
              "name": {
                "value": "gail"
              }
            },
            {
              "name": {
                "value": "gene"
              }
            },
            {
              "name": {
                "value": "genevieve"
              }
            },
            {
              "name": {
                "value": "geoff"
              }
            },
            {
              "name": {
                "value": "geoffrey"
              }
            },
            {
              "name": {
                "value": "george"
              }
            },
            {
              "name": {
                "value": "georgine"
              }
            },
            {
              "name": {
                "value": "gerald"
              }
            },
            {
              "name": {
                "value": "geraldine"
              }
            },
            {
              "name": {
                "value": "gerrie"
              }
            },
            {
              "name": {
                "value": "gerry"
              }
            },
            {
              "name": {
                "value": "gertie"
              }
            },
            {
              "name": {
                "value": "gertrude"
              }
            },
            {
              "name": {
                "value": "gil"
              }
            },
            {
              "name": {
                "value": "gilbert"
              }
            },
            {
              "name": {
                "value": "gina"
              }
            },
            {
              "name": {
                "value": "greg"
              }
            },
            {
              "name": {
                "value": "gretta"
              }
            },
            {
              "name": {
                "value": "gus"
              }
            },
            {
              "name": {
                "value": "gwen"
              }
            },
            {
              "name": {
                "value": "gwendolyn"
              }
            },
            {
              "name": {
                "value": "hal"
              }
            },
            {
              "name": {
                "value": "hank"
              }
            },
            {
              "name": {
                "value": "hannah"
              }
            },
            {
              "name": {
                "value": "harold"
              }
            },
            {
              "name": {
                "value": "harriet"
              }
            },
            {
              "name": {
                "value": "harry"
              }
            },
            {
              "name": {
                "value": "hattie"
              }
            },
            {
              "name": {
                "value": "heather"
              }
            },
            {
              "name": {
                "value": "henny"
              }
            },
            {
              "name": {
                "value": "henrietta"
              }
            },
            {
              "name": {
                "value": "henry"
              }
            },
            {
              "name": {
                "value": "herb"
              }
            },
            {
              "name": {
                "value": "herbert"
              }
            },
            {
              "name": {
                "value": "hester"
              }
            },
            {
              "name": {
                "value": "hetty"
              }
            },
            {
              "name": {
                "value": "hipsbibah"
              }
            },
            {
              "name": {
                "value": "hipsie"
              }
            },
            {
              "name": {
                "value": "hubert"
              }
            },
            {
              "name": {
                "value": "hugh"
              }
            },
            {
              "name": {
                "value": "iggy"
              }
            },
            {
              "name": {
                "value": "ignatius"
              }
            },
            {
              "name": {
                "value": "irene"
              }
            },
            {
              "name": {
                "value": "isabel"
              }
            },
            {
              "name": {
                "value": "isabella"
              }
            },
            {
              "name": {
                "value": "isabelle"
              }
            },
            {
              "name": {
                "value": "isadora"
              }
            },
            {
              "name": {
                "value": "isadore"
              }
            },
            {
              "name": {
                "value": "issy"
              }
            },
            {
              "name": {
                "value": "izzy"
              }
            },
            {
              "name": {
                "value": "jacob"
              }
            },
            {
              "name": {
                "value": "jake"
              }
            },
            {
              "name": {
                "value": "james"
              }
            },
            {
              "name": {
                "value": "jamie"
              }
            },
            {
              "name": {
                "value": "jan"
              }
            },
            {
              "name": {
                "value": "janet"
              }
            },
            {
              "name": {
                "value": "jason"
              }
            },
            {
              "name": {
                "value": "jay"
              }
            },
            {
              "name": {
                "value": "jean"
              }
            },
            {
              "name": {
                "value": "jeb"
              }
            },
            {
              "name": {
                "value": "jebadiah"
              }
            },
            {
              "name": {
                "value": "jeff"
              }
            },
            {
              "name": {
                "value": "jefferson"
              }
            },
            {
              "name": {
                "value": "jeffrey"
              }
            },
            {
              "name": {
                "value": "jenn"
              }
            },
            {
              "name": {
                "value": "jennie"
              }
            },
            {
              "name": {
                "value": "jennifer"
              }
            },
            {
              "name": {
                "value": "jenny"
              }
            },
            {
              "name": {
                "value": "jeremiah"
              }
            },
            {
              "name": {
                "value": "jeremy"
              }
            },
            {
              "name": {
                "value": "jerry"
              }
            },
            {
              "name": {
                "value": "jessica"
              }
            },
            {
              "name": {
                "value": "jessie"
              }
            },
            {
              "name": {
                "value": "jim"
              }
            },
            {
              "name": {
                "value": "jimmie"
              }
            },
            {
              "name": {
                "value": "jimmy"
              }
            },
            {
              "name": {
                "value": "jo"
              }
            },
            {
              "name": {
                "value": "joan"
              }
            },
            {
              "name": {
                "value": "joann"
              }
            },
            {
              "name": {
                "value": "joanna"
              }
            },
            {
              "name": {
                "value": "joanne"
              }
            },
            {
              "name": {
                "value": "jody"
              }
            },
            {
              "name": {
                "value": "joe"
              }
            },
            {
              "name": {
                "value": "joey"
              }
            },
            {
              "name": {
                "value": "johann"
              }
            },
            {
              "name": {
                "value": "johanna"
              }
            },
            {
              "name": {
                "value": "johannah"
              }
            },
            {
              "name": {
                "value": "john"
              }
            },
            {
              "name": {
                "value": "jon"
              }
            },
            {
              "name": {
                "value": "jonathan"
              }
            },
            {
              "name": {
                "value": "joseph"
              }
            },
            {
              "name": {
                "value": "josey"
              }
            },
            {
              "name": {
                "value": "josh"
              }
            },
            {
              "name": {
                "value": "joshua"
              }
            },
            {
              "name": {
                "value": "josophine"
              }
            },
            {
              "name": {
                "value": "joy"
              }
            },
            {
              "name": {
                "value": "joyce"
              }
            },
            {
              "name": {
                "value": "judith"
              }
            },
            {
              "name": {
                "value": "judy"
              }
            },
            {
              "name": {
                "value": "julia"
              }
            },
            {
              "name": {
                "value": "julie"
              }
            },
            {
              "name": {
                "value": "justin"
              }
            },
            {
              "name": {
                "value": "kate"
              }
            },
            {
              "name": {
                "value": "katelin"
              }
            },
            {
              "name": {
                "value": "katelyn"
              }
            },
            {
              "name": {
                "value": "katherine"
              }
            },
            {
              "name": {
                "value": "kathleen"
              }
            },
            {
              "name": {
                "value": "kathryn"
              }
            },
            {
              "name": {
                "value": "kathy"
              }
            },
            {
              "name": {
                "value": "katie"
              }
            },
            {
              "name": {
                "value": "katy"
              }
            },
            {
              "name": {
                "value": "kay"
              }
            },
            {
              "name": {
                "value": "kaye"
              }
            },
            {
              "name": {
                "value": "kelly"
              }
            },
            {
              "name": {
                "value": "ken"
              }
            },
            {
              "name": {
                "value": "kenneth"
              }
            },
            {
              "name": {
                "value": "kenny"
              }
            },
            {
              "name": {
                "value": "kevin"
              }
            },
            {
              "name": {
                "value": "kim"
              }
            },
            {
              "name": {
                "value": "kimberley"
              }
            },
            {
              "name": {
                "value": "kimberly"
              }
            },
            {
              "name": {
                "value": "kristen"
              }
            },
            {
              "name": {
                "value": "kristin"
              }
            },
            {
              "name": {
                "value": "kristy"
              }
            },
            {
              "name": {
                "value": "kyle"
              }
            },
            {
              "name": {
                "value": "lamont"
              }
            },
            {
              "name": {
                "value": "larry"
              }
            },
            {
              "name": {
                "value": "latisha"
              }
            },
            {
              "name": {
                "value": "laura"
              }
            },
            {
              "name": {
                "value": "lauren"
              }
            },
            {
              "name": {
                "value": "laurence"
              }
            },
            {
              "name": {
                "value": "lawrence"
              }
            },
            {
              "name": {
                "value": "lee"
              }
            },
            {
              "name": {
                "value": "lena"
              }
            },
            {
              "name": {
                "value": "lenny"
              }
            },
            {
              "name": {
                "value": "lenora"
              }
            },
            {
              "name": {
                "value": "leo"
              }
            },
            {
              "name": {
                "value": "leon"
              }
            },
            {
              "name": {
                "value": "leonard"
              }
            },
            {
              "name": {
                "value": "les"
              }
            },
            {
              "name": {
                "value": "lester"
              }
            },
            {
              "name": {
                "value": "libby"
              }
            },
            {
              "name": {
                "value": "lillian"
              }
            },
            {
              "name": {
                "value": "lilly"
              }
            },
            {
              "name": {
                "value": "linda"
              }
            },
            {
              "name": {
                "value": "lindsay"
              }
            },
            {
              "name": {
                "value": "lindsey"
              }
            },
            {
              "name": {
                "value": "lisa"
              }
            },
            {
              "name": {
                "value": "liz"
              }
            },
            {
              "name": {
                "value": "lizzie"
              }
            },
            {
              "name": {
                "value": "lois"
              }
            },
            {
              "name": {
                "value": "loretta"
              }
            },
            {
              "name": {
                "value": "lorie"
              }
            },
            {
              "name": {
                "value": "lorraine"
              }
            },
            {
              "name": {
                "value": "lou"
              }
            },
            {
              "name": {
                "value": "louis"
              }
            },
            {
              "name": {
                "value": "louise"
              }
            },
            {
              "name": {
                "value": "lucias"
              }
            },
            {
              "name": {
                "value": "lucinda"
              }
            },
            {
              "name": {
                "value": "lucy"
              }
            },
            {
              "name": {
                "value": "luke"
              }
            },
            {
              "name": {
                "value": "lynn"
              }
            },
            {
              "name": {
                "value": "maddy"
              }
            },
            {
              "name": {
                "value": "madeline"
              }
            },
            {
              "name": {
                "value": "madelyn"
              }
            },
            {
              "name": {
                "value": "madge"
              }
            },
            {
              "name": {
                "value": "madie"
              }
            },
            {
              "name": {
                "value": "magdelina"
              }
            },
            {
              "name": {
                "value": "maggie"
              }
            },
            {
              "name": {
                "value": "maggy"
              }
            },
            {
              "name": {
                "value": "mandy"
              }
            },
            {
              "name": {
                "value": "marcus"
              }
            },
            {
              "name": {
                "value": "margaret"
              }
            },
            {
              "name": {
                "value": "margaretta"
              }
            },
            {
              "name": {
                "value": "marge"
              }
            },
            {
              "name": {
                "value": "margie"
              }
            },
            {
              "name": {
                "value": "margy"
              }
            },
            {
              "name": {
                "value": "marjorie"
              }
            },
            {
              "name": {
                "value": "mark"
              }
            },
            {
              "name": {
                "value": "martin"
              }
            },
            {
              "name": {
                "value": "martina"
              }
            },
            {
              "name": {
                "value": "marty"
              }
            },
            {
              "name": {
                "value": "marv"
              }
            },
            {
              "name": {
                "value": "marvin"
              }
            },
            {
              "name": {
                "value": "mary"
              }
            },
            {
              "name": {
                "value": "mathew"
              }
            },
            {
              "name": {
                "value": "matilda"
              }
            },
            {
              "name": {
                "value": "matt"
              }
            },
            {
              "name": {
                "value": "matthew"
              }
            },
            {
              "name": {
                "value": "maud"
              }
            },
            {
              "name": {
                "value": "megan"
              }
            },
            {
              "name": {
                "value": "mel"
              }
            },
            {
              "name": {
                "value": "melinda"
              }
            },
            {
              "name": {
                "value": "melissa"
              }
            },
            {
              "name": {
                "value": "merv"
              }
            },
            {
              "name": {
                "value": "mervin"
              }
            },
            {
              "name": {
                "value": "michael"
              }
            },
            {
              "name": {
                "value": "michelle"
              }
            },
            {
              "name": {
                "value": "mick"
              }
            },
            {
              "name": {
                "value": "mickey"
              }
            },
            {
              "name": {
                "value": "mike"
              }
            },
            {
              "name": {
                "value": "mindy"
              }
            },
            {
              "name": {
                "value": "minnie"
              }
            },
            {
              "name": {
                "value": "missy"
              }
            },
            {
              "name": {
                "value": "mitch"
              }
            },
            {
              "name": {
                "value": "mitchell"
              }
            },
            {
              "name": {
                "value": "napoleon"
              }
            },
            {
              "name": {
                "value": "nat"
              }
            },
            {
              "name": {
                "value": "nate"
              }
            },
            {
              "name": {
                "value": "nathan"
              }
            },
            {
              "name": {
                "value": "nathaniel"
              }
            },
            {
              "name": {
                "value": "neil"
              }
            },
            {
              "name": {
                "value": "newt"
              }
            },
            {
              "name": {
                "value": "newton"
              }
            },
            {
              "name": {
                "value": "nicholas"
              }
            },
            {
              "name": {
                "value": "nick"
              }
            },
            {
              "name": {
                "value": "nickie"
              }
            },
            {
              "name": {
                "value": "nicole"
              }
            },
            {
              "name": {
                "value": "nora"
              }
            },
            {
              "name": {
                "value": "norbert"
              }
            },
            {
              "name": {
                "value": "obediah"
              }
            },
            {
              "name": {
                "value": "obie"
              }
            },
            {
              "name": {
                "value": "oliver"
              }
            },
            {
              "name": {
                "value": "ollie"
              }
            },
            {
              "name": {
                "value": "oswald"
              }
            },
            {
              "name": {
                "value": "ozzy"
              }
            },
            {
              "name": {
                "value": "pat"
              }
            },
            {
              "name": {
                "value": "patricia"
              }
            },
            {
              "name": {
                "value": "patrick"
              }
            },
            {
              "name": {
                "value": "patsy"
              }
            },
            {
              "name": {
                "value": "patty"
              }
            },
            {
              "name": {
                "value": "paulina"
              }
            },
            {
              "name": {
                "value": "peggy"
              }
            },
            {
              "name": {
                "value": "penelope"
              }
            },
            {
              "name": {
                "value": "penny"
              }
            },
            {
              "name": {
                "value": "pete"
              }
            },
            {
              "name": {
                "value": "peter"
              }
            },
            {
              "name": {
                "value": "philip"
              }
            },
            {
              "name": {
                "value": "phillip"
              }
            },
            {
              "name": {
                "value": "philpoint"
              }
            },
            {
              "name": {
                "value": "pointlucas"
              }
            },
            {
              "name": {
                "value": "pointmonty"
              }
            },
            {
              "name": {
                "value": "pointsolomon"
              }
            },
            {
              "name": {
                "value": "pointveronica"
              }
            },
            {
              "name": {
                "value": "polly"
              }
            },
            {
              "name": {
                "value": "prescott"
              }
            },
            {
              "name": {
                "value": "priscilla"
              }
            },
            {
              "name": {
                "value": "prissy"
              }
            },
            {
              "name": {
                "value": "prudence"
              }
            },
            {
              "name": {
                "value": "prudy"
              }
            },
            {
              "name": {
                "value": "rachel"
              }
            },
            {
              "name": {
                "value": "randolph"
              }
            },
            {
              "name": {
                "value": "randy"
              }
            },
            {
              "name": {
                "value": "ray"
              }
            },
            {
              "name": {
                "value": "raymond"
              }
            },
            {
              "name": {
                "value": "reba"
              }
            },
            {
              "name": {
                "value": "rebecca"
              }
            },
            {
              "name": {
                "value": "reggie"
              }
            },
            {
              "name": {
                "value": "regina"
              }
            },
            {
              "name": {
                "value": "reginald"
              }
            },
            {
              "name": {
                "value": "rena"
              }
            },
            {
              "name": {
                "value": "reuben"
              }
            },
            {
              "name": {
                "value": "ricardo"
              }
            },
            {
              "name": {
                "value": "rich"
              }
            },
            {
              "name": {
                "value": "richard"
              }
            },
            {
              "name": {
                "value": "richie"
              }
            },
            {
              "name": {
                "value": "rick"
              }
            },
            {
              "name": {
                "value": "ricky"
              }
            },
            {
              "name": {
                "value": "rob"
              }
            },
            {
              "name": {
                "value": "robby"
              }
            },
            {
              "name": {
                "value": "robert"
              }
            },
            {
              "name": {
                "value": "roberta"
              }
            },
            {
              "name": {
                "value": "roberto"
              }
            },
            {
              "name": {
                "value": "rod"
              }
            },
            {
              "name": {
                "value": "ron"
              }
            },
            {
              "name": {
                "value": "ronald"
              }
            },
            {
              "name": {
                "value": "ronnie"
              }
            },
            {
              "name": {
                "value": "ronny"
              }
            },
            {
              "name": {
                "value": "rosabel"
              }
            },
            {
              "name": {
                "value": "rosabella"
              }
            },
            {
              "name": {
                "value": "rosaenn"
              }
            },
            {
              "name": {
                "value": "rosaenna"
              }
            },
            {
              "name": {
                "value": "rosalyn"
              }
            },
            {
              "name": {
                "value": "rose"
              }
            },
            {
              "name": {
                "value": "roseann"
              }
            },
            {
              "name": {
                "value": "roseanna"
              }
            },
            {
              "name": {
                "value": "roxanna"
              }
            },
            {
              "name": {
                "value": "roxanne"
              }
            },
            {
              "name": {
                "value": "roz"
              }
            },
            {
              "name": {
                "value": "rube"
              }
            },
            {
              "name": {
                "value": "rudolph"
              }
            },
            {
              "name": {
                "value": "rudy"
              }
            },
            {
              "name": {
                "value": "russ"
              }
            },
            {
              "name": {
                "value": "russell"
              }
            },
            {
              "name": {
                "value": "rusty"
              }
            },
            {
              "name": {
                "value": "ryan"
              }
            },
            {
              "name": {
                "value": "sal"
              }
            },
            {
              "name": {
                "value": "sam"
              }
            },
            {
              "name": {
                "value": "samantha"
              }
            },
            {
              "name": {
                "value": "sammy"
              }
            },
            {
              "name": {
                "value": "samuel"
              }
            },
            {
              "name": {
                "value": "sandra"
              }
            },
            {
              "name": {
                "value": "sandy"
              }
            },
            {
              "name": {
                "value": "sara"
              }
            },
            {
              "name": {
                "value": "sarah"
              }
            },
            {
              "name": {
                "value": "scott"
              }
            },
            {
              "name": {
                "value": "scotty"
              }
            },
            {
              "name": {
                "value": "sean"
              }
            },
            {
              "name": {
                "value": "shelly"
              }
            },
            {
              "name": {
                "value": "shelton"
              }
            },
            {
              "name": {
                "value": "sherry"
              }
            },
            {
              "name": {
                "value": "shirley"
              }
            },
            {
              "name": {
                "value": "sly"
              }
            },
            {
              "name": {
                "value": "stella"
              }
            },
            {
              "name": {
                "value": "steph"
              }
            },
            {
              "name": {
                "value": "stephanie"
              }
            },
            {
              "name": {
                "value": "stephen"
              }
            },
            {
              "name": {
                "value": "steve"
              }
            },
            {
              "name": {
                "value": "steven"
              }
            },
            {
              "name": {
                "value": "sue"
              }
            },
            {
              "name": {
                "value": "sullivan"
              }
            },
            {
              "name": {
                "value": "sully"
              }
            },
            {
              "name": {
                "value": "susan"
              }
            },
            {
              "name": {
                "value": "susannah"
              }
            },
            {
              "name": {
                "value": "susie"
              }
            },
            {
              "name": {
                "value": "sylvester"
              }
            },
            {
              "name": {
                "value": "tabby"
              }
            },
            {
              "name": {
                "value": "tabitha"
              }
            },
            {
              "name": {
                "value": "ted"
              }
            },
            {
              "name": {
                "value": "teddy"
              }
            },
            {
              "name": {
                "value": "terence"
              }
            },
            {
              "name": {
                "value": "teresa"
              }
            },
            {
              "name": {
                "value": "terry"
              }
            },
            {
              "name": {
                "value": "tess"
              }
            },
            {
              "name": {
                "value": "tessa"
              }
            },
            {
              "name": {
                "value": "tessie"
              }
            },
            {
              "name": {
                "value": "thad"
              }
            },
            {
              "name": {
                "value": "thaddeus"
              }
            },
            {
              "name": {
                "value": "theo"
              }
            },
            {
              "name": {
                "value": "theodore"
              }
            },
            {
              "name": {
                "value": "theresa"
              }
            },
            {
              "name": {
                "value": "thom"
              }
            },
            {
              "name": {
                "value": "thomas"
              }
            },
            {
              "name": {
                "value": "tiffany"
              }
            },
            {
              "name": {
                "value": "tilla"
              }
            },
            {
              "name": {
                "value": "tim"
              }
            },
            {
              "name": {
                "value": "timmy"
              }
            },
            {
              "name": {
                "value": "timothy"
              }
            },
            {
              "name": {
                "value": "tina"
              }
            },
            {
              "name": {
                "value": "tish"
              }
            },
            {
              "name": {
                "value": "tisha"
              }
            },
            {
              "name": {
                "value": "tobias"
              }
            },
            {
              "name": {
                "value": "toby"
              }
            },
            {
              "name": {
                "value": "tom"
              }
            },
            {
              "name": {
                "value": "tommy"
              }
            },
            {
              "name": {
                "value": "tony"
              }
            },
            {
              "name": {
                "value": "tori"
              }
            },
            {
              "name": {
                "value": "torie"
              }
            },
            {
              "name": {
                "value": "torri"
              }
            },
            {
              "name": {
                "value": "torrie"
              }
            },
            {
              "name": {
                "value": "tory"
              }
            },
            {
              "name": {
                "value": "trisha"
              }
            },
            {
              "name": {
                "value": "trixie"
              }
            },
            {
              "name": {
                "value": "trudy"
              }
            },
            {
              "name": {
                "value": "val"
              }
            },
            {
              "name": {
                "value": "valeri"
              }
            },
            {
              "name": {
                "value": "valerie"
              }
            },
            {
              "name": {
                "value": "van"
              }
            },
            {
              "name": {
                "value": "vanessa"
              }
            },
            {
              "name": {
                "value": "vanna"
              }
            },
            {
              "name": {
                "value": "vic"
              }
            },
            {
              "name": {
                "value": "vicki"
              }
            },
            {
              "name": {
                "value": "vickie"
              }
            },
            {
              "name": {
                "value": "vicky"
              }
            },
            {
              "name": {
                "value": "victor"
              }
            },
            {
              "name": {
                "value": "victoria"
              }
            },
            {
              "name": {
                "value": "vin"
              }
            },
            {
              "name": {
                "value": "vince"
              }
            },
            {
              "name": {
                "value": "vincent"
              }
            },
            {
              "name": {
                "value": "vincenzo"
              }
            },
            {
              "name": {
                "value": "vincenzon"
              }
            },
            {
              "name": {
                "value": "vinnie"
              }
            },
            {
              "name": {
                "value": "vinson"
              }
            },
            {
              "name": {
                "value": "waldo"
              }
            },
            {
              "name": {
                "value": "wendy"
              }
            },
            {
              "name": {
                "value": "wilber"
              }
            },
            {
              "name": {
                "value": "wilbur"
              }
            },
            {
              "name": {
                "value": "wilhelmina"
              }
            },
            {
              "name": {
                "value": "will"
              }
            },
            {
              "name": {
                "value": "william"
              }
            },
            {
              "name": {
                "value": "willie"
              }
            },
            {
              "name": {
                "value": "wilma"
              }
            },
            {
              "name": {
                "value": "wilson"
              }
            },
            {
              "name": {
                "value": "winnie"
              }
            },
            {
              "name": {
                "value": "winnifred"
              }
            },
            {
              "name": {
                "value": "winny"
              }
            },
            {
              "name": {
                "value": "woody"
              }
            },
            {
              "name": {
                "value": "zach"
              }
            },
            {
              "name": {
                "value": "zachariah"
              }
            },
            {
              "name": {
                "value": "zachary"
              }
            }
          ]
        }
      ]
    }
  }
};
