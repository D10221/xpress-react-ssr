import db from "@local/db";

/** */
export default async () => {
    return (await db).all("select * from users");
}