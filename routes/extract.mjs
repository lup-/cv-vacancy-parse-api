import {detectType} from "../modules/generalParsers.mjs";
import {extractMetadataFromResume} from "../modules/resumeParsers.mjs";
import {extractMetadataFromVacancy} from "../modules/vacancyParsers.mjs";

export default {
    async cv(ctx) {
        let text = ctx.request.body.text;
        let meta = await extractMetadataFromResume(text);
        ctx.body = {cv: meta};
    },

    async vacancy(ctx) {
        let text = ctx.request.body.text;
        let meta = await extractMetadataFromVacancy(text);

        ctx.body = {vacancy: meta};
    },

    detect(ctx) {
        let text = ctx.request.body.text;
        let {isVacancy, isResume} = detectType(text);
        ctx.body = {vacancy: isVacancy, cv: isResume};
    }
}
