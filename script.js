// なんのURLでしょう？そうです。我が家の大事なhueの設定を好き勝手できるAPIのURLです。。
// ここを訪れた方が優しい方だと助かります。どうかお手柔らかに。
const url = 'http://192.168.1.55/api/KTx5FYjINaWYhj0XHMbUsY51HBgvwGV8abXjA7N-/lights/1'
changeBG()

// button onclick
function update() {
    if (window.confirm("部屋の電気を勝手に変えます。よろしいですか？")) {
        let hex = getHexInput()
        let rgb = ColorConverter.hexToRgb(hex)
        let xy = ColorConverter.rgbToXy(rgb[0], rgb[1], rgb[2])
        putHueColor(xy)
        const bg = document.body
        bg.style.backgroundColor = `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`
        document.getElementById('message').innerText = 'なんだってー！'
    }
}

// hex-input から値を返す
function getHexInput() {
    const hexInput = document.getElementById('hex-input')
    return hexInput.value
}

// hueを更新
function putHueColor(xy) {
    const data = JSON.stringify({
    'bri': 254,
    'sat':254,
    'xy': xy,
    });

    fetch(`${url}/state`, {
    method: 'PUT',
    body: data,
    })
    .then((response) => response.json())
    .then((result) => {
        console.log('Success:', result);
    })
}

function changeBG() {
    const bg = document.body
    getHueColor().then(res =>
        // とにかくhueに合わせて背景色変更
        bg.style.backgroundColor = `hsl(${(res['hue']/65536)*360},${(res['sat']/255)*100}%,${(res['bri']/255)*100}%)`
    )
}

async function getHueColor() {
    const response = await fetch(url, {
        method: 'GET',
    })
    let j = await response.json();
    return j['state']
}