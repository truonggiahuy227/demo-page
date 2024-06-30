import Resizer from "react-image-file-resizer";
const {
    BedrockRuntimeClient,
    InvokeModelCommand,
    InvokeModelCommandInput,
    InvokeModelCommandOutput,
    InvokeModelWithResponseStreamCommand,
    InvokeModelWithResponseStreamCommandInput,
    InvokeModelWithResponseStreamCommandOutput,
  } = require("@aws-sdk/client-bedrock-runtime");




const client = new BedrockRuntimeClient({ 
    credentials: { 
        accessKeyId: process.env.AWS_ACCESS_KEY_ID , 
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }, 
    region: process.env.REGION || 'us-east-1' });
  
  const logger = console; // import your own logger
  
  /*
  * Invoke Model
  * @param {InvokeModelCommandInput} params
  * @returns {Promise<InvokeModelCommandOutput>}
  * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/BedrockRuntime.html#invokeModel-property
  */
  const invokeModel = async (params) => {
    logger.debug(params);
    const command = new InvokeModelCommand(params);
    const res = await client.send(command);
    logger.debug('Successfully invoke model');
    logger.debug(res);
    return res;
  }
  const convertToBase64 = async (selectedFile) => {
    const reader = new FileReader()

    reader.readAsDataURL(selectedFile)
    reader.onload = () => {
        return reader.result
    };
  }

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        100,
        100,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const user_msg = `You are a helpful assistant. Now, look at this picture and tell me the context of it. 
  You must focus on only 2 things: Scene and Environment.
  Scene includes bar, pub, restaurant, grocery store, supermarket, party, celebration, gathering, happy hour and fun time
  And Environment includes indoor and outdoor.
  
  The context:`
  

  const invokeModelImage = async (base64) => {
    const params = {
        modelId: 'anthropic.claude-3-haiku-20240307-v1:0',
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": "image/jpeg",
                                "data": base64
                            }
                        },
                        {
                            "type": "text",
                            "text": user_msg
                        }
                    ]
                }
            ],
            "max_tokens": 1000,
            "anthropic_version": "bedrock-2023-05-31"
        })
  }

  return await invokeModel(params)
}
  /*
  * Invoke Model With Response Stream
  * @param {InvokeModelWithResponseStreamCommandInput} params
  * @returns {Promise<InvokeModelWithResponseStreamCommandOutput>}
  * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/BedrockRuntime.html#invokeModelWithResponseStream-property
  */
  const invokeModelWithResponseStream = async (params) => {
    logger.debug(params);
    const command = new InvokeModelWithResponseStreamCommand(params);
    const res = await client.send(command);
    logger.debug('Successfully invoke model with response stream');
    logger.debug(res);
    return res;
  }
  
  export default {
    invokeModel,
    invokeModelImage,
    convertToBase64,
    resizeFile,
    invokeModelWithResponseStream
  }