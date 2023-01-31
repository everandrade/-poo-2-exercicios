import { TVideoDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class VideoDatabase extends BaseDatabase {
    public static TABLE_VIDEOS = "videos"

    public async findVideos(q: string | undefined) {
        let videosDB

        if (q) {
            const result: TVideoDB[] = await BaseDatabase.connection(VideoDatabase.TABLE_VIDEOS).where("title", "LIKE", `%${q}%`)

            videosDB = result

        } else {
            const result: TVideoDB[] = await BaseDatabase.connection(VideoDatabase.TABLE_VIDEOS)

            videosDB = result
        }

        return videosDB
    }

    public async findVideoById(id: string) {
        const [videoDB]: TVideoDB[] | undefined[] = await BaseDatabase.connection(VideoDatabase.TABLE_VIDEOS).where({ id })
        return videoDB
    }

    public async insertVideo(newVideoDB: TVideoDB) {
        await BaseDatabase.connection(VideoDatabase.TABLE_VIDEOS).insert(newVideoDB)
    }

    public async findVideoByIdToEdit(id: string) {
        const [videoDB]: TVideoDB[] | undefined[] = await BaseDatabase.connection(VideoDatabase.TABLE_VIDEOS).where({ id }).first()
        return videoDB
    }

    public async updateVideo(id: string, updatedVideo: TVideoDB) {
        const result = await BaseDatabase.connection(VideoDatabase.TABLE_VIDEOS)
            .update(updatedVideo)
            .where({ id });
        return result;
    }

    public async deleteVideo(id: string) {
        try {
            const [videoExists] = await BaseDatabase.connection(VideoDatabase.TABLE_VIDEOS).where({ id });

            if (videoExists) {
                await BaseDatabase.connection(VideoDatabase.TABLE_VIDEOS)
                    .del()
                    .where({ id });
            } else {
                throw new Error("'id' inválida");
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}