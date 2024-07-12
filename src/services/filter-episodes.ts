import { DTOPodCastModel } from "../models/dto-podcast-model";
import { repositoryPodcast } from "../repositories/podcast-repository"
import { httpStatusCode } from "../utils/http-status-code";


export const serviceFilterEpisodes = async(podcastName:string | undefined): Promise<DTOPodCastModel> => {


    //define a interface de retorno
    let responseFormat: DTOPodCastModel = {
        statusCode: 0,
        body: [],
    }

    //pega a primeira string informada após o "?p=" | caso não tenha nada, é retornado vazio
    //busca os dados
    const queryString = podcastName?.split("?p=")[1] ?? "";
    const data = await repositoryPodcast(queryString);

    //verifico se tem conteúdo

    responseFormat.statusCode !== 0 ? httpStatusCode.OK : httpStatusCode.NO_CONTENT;

    responseFormat.body = data;

    return responseFormat;
}