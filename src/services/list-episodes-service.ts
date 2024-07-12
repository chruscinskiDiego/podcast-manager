import { repositoryPodcast } from "../repositories/podcast-repository";
import { DTOPodCastModel } from "../models/dto-podcast-model";
import { httpStatusCode } from "../utils/http-status-code";

export const listEpisodesService = async():Promise<DTOPodCastModel> => {


    //define a interface de retorno
    let responseFormat: DTOPodCastModel = {
        statusCode: 0,
        body: [],
    }

    const data = await repositoryPodcast();

    responseFormat.statusCode !== 0 ? httpStatusCode.OK : httpStatusCode.NO_CONTENT;

    responseFormat.body = data;

    return responseFormat;
}