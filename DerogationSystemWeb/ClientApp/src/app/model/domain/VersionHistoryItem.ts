
export class VersionHistoryItem {
    
    public version?: string;
    public releaseDate?: string;
    public description?: string;


    constructor(version: string, releaseDate: string, description: string) {
        this.version = version;
        this.releaseDate = releaseDate;
        this.description = description;
    }
}