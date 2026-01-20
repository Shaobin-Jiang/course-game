import {Course, Game} from './engine/game';
import {Rect} from './engine/geometry';
import {loadImage, Loading, BrowserValidator} from './engine/util';
import {easter_egg} from './engine/easter-egg';

async function main(): Promise<void> {
    let browser_validator = new BrowserValidator([
        {
            match: function (user_agent: string) {
                return /safari/.test(user_agent) && !/chrome/.test(user_agent);
            },
            error: '小游戏暂时不支持 Safari 浏览器，请使用 Chrome 或 Edge 等浏览器代替',
        },
    ]);
    if (browser_validator.browser_is_banned()) {
        alert(browser_validator.error_message);
        return;
    }

    new Loading();

    if (typeof window.image_list != 'undefined') {
        await Promise.all(window.image_list.map(loadImage));
    }

    let map: HTMLImageElement = await loadImage(window.game_map);
    let finished_marker: HTMLImageElement = await loadImage(window.finished_marker);
    let unfinished_marker: HTMLImageElement = await loadImage(window.unfinished_marker);

    let sessions: Array<{position: Rect; get: {[props: string]: any}; name: string}> = [];
    for (let item of window.sessions) {
        sessions.push({position: new Rect(...item.position), get: item.get, name: item.name});
    }

    let course: Course = {
        map,
        finished_marker,
        unfinished_marker,
        sessions,
    };

    let game: Game = new Game(course);
    game.about_text = window.about_text;
    easter_egg(game);
    window.sessions = [];
    await game.start();
}

main();

declare global {
    interface Window {
        loaded_sessions: {[props: string]: () => object};
        progress: {session: number; level: number; scene: number};
        about_text: string;
        game_map: string;
        finished_marker: string;
        unfinished_marker: string;
        sessions: Array<{position: [number, number, number, number, number]; get: object; name: string}>;
        static_url: string;
        image_list: Array<string | [string, boolean]>;
    }
}
