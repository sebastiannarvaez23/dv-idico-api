import { OAuthClientModel } from "../models/o-auth-client.model";

export interface IOAuthClientRepository {
    findByClientName(clientId: string): Promise<OAuthClientModel | null>;
    addMicroservice(credential: { name: string, secret: string }): Promise<OAuthClientModel | null>;
}