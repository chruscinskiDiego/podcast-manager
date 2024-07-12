import { PodcastModel } from "./podcast-model";

export interface DTOPodCastModel {

    statusCode: number;
    body: PodcastModel[];

}