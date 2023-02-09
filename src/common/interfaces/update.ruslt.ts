import { ObjectId } from 'mongoose';

export interface UpdateResult {
    acknowledged?: boolean;
    matchedCount?: number;
    modifiedCount?: number;
    upsertedCount?: number;
    upsertedId?: ObjectId;
}
