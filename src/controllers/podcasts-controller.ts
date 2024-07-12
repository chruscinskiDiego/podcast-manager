import {IncomingMessage, ServerResponse} from "http";
import {listEpisodesService} from '../services/list-episodes-service';
import { serviceFilterEpisodes } from "../services/filter-episodes";
import { httpStatusCode } from "../utils/http-status-code";
import { ContentType } from "../utils/https-content-types";
import { DTOPodCastModel } from "../models/dto-podcast-model";

export const getListEpisodes = async(request:IncomingMessage, response: ServerResponse) => {


    const content:DTOPodCastModel = await listEpisodesService();

    response.writeHead(content.statusCode, {"Content-Type": ContentType.JSON});
    response.write(JSON.stringify(content.body));
    response.end();

}

export const getEpisodesByName = async(request:IncomingMessage, response: ServerResponse) => {
    
   

    const content:DTOPodCastModel = await serviceFilterEpisodes(request.url);

    response.writeHead(content.statusCode, {"Content-Type": ContentType.JSON});
    response.write(JSON.stringify(content.body));
    response.end();

}