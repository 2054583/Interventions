export interface IProbleme {
     id: number,
     prenom: string,
     nom: string,
     noTypeProbleme?: number,
     courriel?: string,
     telephone?: string,
     notification: number,
     noUnite?: string,
     descriptionProbleme: string,
     dateProbleme?: Date
    }