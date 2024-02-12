import { utapi } from "../../../../utils/uploadThing";
import { pipeline } from '@xenova/transformers';
export async function POST(req: Request, res: Response) {
    //get the uplaod thing url
    const formData = await req.formData();
    const files = formData.getAll("files");
    const response = await utapi.uploadFiles(files);
    const responseData = response[0].data;
    const url = responseData?.url;
    console.log(url);

    // detect it using onnx model
    const detector = await pipeline('object-detection', 'Xenova/detr-resnet-50');
    const output = await detector(url);
    console.log(output);
    
    const countObj:{[key:string]:number} = {};
    output.forEach(({score, label}: any) => {
        if(score>0.75){
            if(countObj[label]){
                countObj[label] += 1;
            }else{
                countObj[label] = 1;
            }
        }
    });
    return new Response(JSON.stringify({
        url:url,
        label: JSON.stringify(countObj),
    }), { status: 200 });
}