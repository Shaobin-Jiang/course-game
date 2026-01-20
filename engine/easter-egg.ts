import {Game} from './game';

export function easter_egg(game: Game) {
    let has_triggered: string | null = window.localStorage.getItem('easter-egg');
    if (has_triggered === '1') {
        // You are only allowed to witness god for once
        return;
    }

    let pressed: string = '';

    document.addEventListener('keypress', callback);

    function callback(event: KeyboardEvent) {
        if (window.progress.session < window.sessions.length - 1) {
            return;
        }

        let trigger = 'wpy';
        let new_seq = `${pressed}${event.key}`;
        if (trigger.indexOf(new_seq) != 0) {
            pressed = '';
        } else {
            pressed = new_seq;
        }

        if (pressed === trigger) {
            document.removeEventListener('keypress', callback);
            window.localStorage.setItem('easter-egg', '1');
            add_easter_egg_text();
        }
    }

    function add_easter_egg_text() {
        game.about_text = `<p>在很遥远的过去，一位神秘的 23 级师兄在考试前凌晨三点仍然在水群并自信表示绝不会因为熬夜错过考试，却在第二天早八的考试开始 45 分钟后才走进考场，其伟大事迹遂被后辈口耳相传。</p>
                           <p style="color: red; font-weight: bold;">课程进度接近尾声，期末考试将至，切记不要期末考试前熬夜。警钟长鸣。</p>
                           ${game.about_text}`;
    }
}


declare global {
    interface Window {
        progress: {session: number; level: number; scene: number};
        sessions: Array<{position: [number, number, number, number, number]; get: object; name: string}>;
    }
}
