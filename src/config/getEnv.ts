export const getEnv = (key: string, defaultValue?: string) => {
    const value = process.env[key] || defaultValue;
    if(value === undefined){
        throw new Error("Error in getting env")
    }

    return value;
}

export const PINECONE_API_KEY = getEnv("PINECONE_API_KEY");
export const GOOGLE_API_KEY = getEnv("GOOGLE_API_KEY")