// デフォルトの店舗マスタ
const defaultStoreMaster = `0096,GF大阪,金
0089,西宮,金
0026,ＬＴ,金
0024,流山,金
0046,西武東戸塚,金
0019,成城コルティ,金
0088,銀座,金
0112,吉祥寺,金
0077,高槻,金
0023,ＮＰ,金
0094,ららぽーと豊洲,金
0005,川崎ルフロン,金
0022,箱崎,金
0017,相模大野,金
0048,青葉台東急,金
0049,そごう川口,金
0100,グランデュオ蒲田,金
0033,浦和パルコ,金
0101,ららぽーとT-BAY,金
0104,ららぽーと富士見,金
0081,池袋ＨＣ,金
0106,ららぽーと海老名,金
0014,新横浜ペペ,金
0009,みなとみらい東急,金
0076,仙台泉,金
0074,仙川,金
0116,武蔵小杉,金
0032,立川,金
0103,京都桂川,金
0099,メルサ栄,金
0035,たまプラーザ,金
0086,FB/青山,金
0090,イオン船橋,金
0117,玉川高島屋,金
0120,マークイズ,金
0119,新百合ヶ丘,金
0125,南町田,金
0129,大森,金
0130,マルイシティ横浜,金
0131,ディアモール大阪,金
0134,mozoワンダーシティ,金
0132,イオン大高,金
0128,グランエミオ所沢,金
0135,新宿マルイ,金
0136,大船ルミネウィング,金
0137,横浜ジョイナス,金
0139,神戸三宮さんちか,金
0140,天王寺ミオ,金
0141,コクーンシティ,金
0142,五反田東急スクエア,金
0143,シャポー船橋,金
0144,イオンモール岡崎,金
0146,テラスモール湘南,金
0145,自由が丘,金
0148,日吉東急,金
0149,アトレ松戸,金
0150,錦糸町パルコ,金
0151,マルニエゲート銀座,金
0152,上大岡京急,金
0153,赤羽アピレ,金
0154,なんばCITY,金
0155,イオン岡山,金
0156,イオン堺北花田,金
0157,京都ポルタ,金
0158,トレッサ横浜,金
0159,名古屋ユニモール,金
0160,ルクアイーレ,金
0161,イーアスつくば,金
0162,シャポー市川,金
0164,セブンパークアリオ柏,金
0166,ペリエ千葉,金
0165,ユニモちはら台,金
0163,イオンモール倉敷,金
0168,アトレ川越,金
0178,神戸umie,金
0177,ららぽーと平塚,金
0171,イオン伊丹,金
0173,東京ドームラクーア,金
0176,イオン豊川,金
0170,アステ川西,金
0169,北千住マルイ,金
0172,アミュプラザ博多,金
0175,ららぽーと門真,金
0174,ヒルズ徳重,金
0181,イオン名取,金
0180,イオン札幌発寒,金
0179,トリエ京王調布,金
0182,モラージュ菖蒲,金
0183,高崎モントレー,金
0184,スマーク伊勢崎,金
0186,プレンティ西神中央,金
0188,イオン鈴鹿,金
0187,アミュプラザ長崎,金
0185,二子玉川ライズ,金
0189,イオン佐野新都市,金
0190,札幌ステラプレイス,金
0191,アトレ大井町,金
0193,アミュプラザくまもと,金
0196,イオン新利府,金
0197,イオン浦和美園,金
0195,ららぽーと立川立飛,金
0192,イオン太田,金
0194,モレラ岐阜,金
0198,マイファミリー溝口,金
0199,ゆめが丘ソラトス,金
0200,新越谷ヴァリエ,金
0201,ミナモア広島,金
0203,ミッテン府中,金
0208,枚方T-SITE,金
0202,ららぽーと安城,金
0205,イオン盛岡南,金
0204,ラブラ万代,金
0206,ららテラス川口店,金
0207,イオンむさし村山店,金
0000,本社,金`;

// ページ読み込み時にデフォルトマスタを設定
document.getElementById('storeMaster').value = defaultStoreMaster;

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const status = document.getElementById('status');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');

// 曜日から日付を計算
function getNextWeekday(targetDay) {
    const days = {
        '日': 0, '月': 1, '火': 2, '水': 3,
        '木': 4, '金': 5, '土': 6
    };
    
    const today = new Date();
    const currentDay = today.getDay();
    const targetDayNum = days[targetDay];
    
    let daysUntilTarget = targetDayNum - currentDay;
    if (daysUntilTarget <= 0) {
        daysUntilTarget += 7;
    }
    
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysUntilTarget);
    
    return targetDate;
}

// 日付をyyyymmdd形式に変換
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// 店舗マスタをパース
function parseStoreMaster(masterText) {
    const masterMap = {};
    const lines = masterText.trim().split('\n');
    
    for (const line of lines) {
        const parts = line.split(',').map(p => p.trim());
        if (parts.length >= 3) {
            masterMap[parts[0]] = {
                name: parts[1],
                shipDay: parts[2]
            };
        }
    }
    
    return masterMap;
}

// ページ全体でのドラッグ&ドロップのデフォルト動作を防止
document.addEventListener('dragover', (e) => {
    e.preventDefault();
});
document.addEventListener('drop', (e) => {
    e.preventDefault();
});

// ドラッグ&ドロップイベント
dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragenter', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFiles(files);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFiles(e.target.files);
    }
});

// ダウンロードボタンのイベントリスナー
document.getElementById('btnDownloadZip').addEventListener('click', async () => {
    if (window.convertedResults) {
        showStatus('processing', '<span class="spinner"></span>ZIPファイルを作成中...');
        await createZipAndDownload(window.convertedResults);
        showStatus('success', '✓ ZIPファイルをダウンロードしました！');
        setTimeout(() => hideDownloadOptions(), 2000);
    }
});

document.getElementById('btnDownloadIndividual').addEventListener('click', async () => {
    if (window.convertedResults) {
        showStatus('processing', '<span class="spinner"></span>CSVファイルをダウンロード中...');
        await downloadIndividualFiles(window.convertedResults);
        showStatus('success', '✓ 3つのCSVファイルをダウンロードしました！');
        setTimeout(() => hideDownloadOptions(), 2000);
    }
});

// ファイル処理（複数ファイル対応）
async function handleFiles(files) {
    const validFiles = Array.from(files).filter(f => f.name.match(/\.(xlsx|xls)$/i));
    
    if (validFiles.length === 0) {
        showStatus('error', 'Excelファイル(.xlsx, .xls)を選択してください。');
        return;
    }

    // 店舗マスタの確認
    const masterText = document.getElementById('storeMaster').value.trim();
    if (!masterText) {
        showStatus('error', '店舗マスタを設定してください。');
        return;
    }

    const fileCount = validFiles.length;
    showStatus('processing', `<span class="spinner"></span>${fileCount}個のExcelファイルを処理中...`);
    showProgress(10);
    hideDownloadOptions();

    try {
        const storeMaster = parseStoreMaster(masterText);
        
        // 全ファイルの結果を統合
        const allResultsA = [];
        const allResultsB1 = [];
        const allResultsB2 = [];
        
        // ヘッダーを最初に追加
        const headerA = '店舗コード,店舗名称,型番,品番,商品コード,商品名称,型番,入数,手持ち日数,ディスプレイ数,上限値,売上ランク,センター在庫,店舗在庫,廃盤,大分類,中分類,小分類,細分類,発注締め日,発注バラ数,タグ1,タグ2,タグ3,タグ4,タグ5,タグ6,タグ7,タグ8';
        allResultsA.push(headerA);
        allResultsB1.push(headerA);
        
        for (let i = 0; i < validFiles.length; i++) {
            const file = validFiles[i];
            const progress = 10 + Math.floor((i / validFiles.length) * 60);
            showProgress(progress);
            showStatus('processing', `<span class="spinner"></span>処理中: ${file.name} (${i + 1}/${fileCount})`);
            
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data, { type: 'array' });
            
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });
            
            // データの解析と変換
            const results = processData(jsonData, storeMaster);
            
            // ヘッダーを除いてデータを追加
            allResultsA.push(...results.A.slice(1));
            allResultsB1.push(...results.B1.slice(1));
            allResultsB2.push(...results.B2);
        }
        
        showProgress(80);
        
        // 変換完了 - ダウンロードオプションを表示
        window.convertedResults = {
            A: allResultsA,
            B1: allResultsB1,
            B2: allResultsB2
        };
        
        showProgress(100);
        
        const totalRows = allResultsA.length - 1; // ヘッダー除く
        showStatus('success', `✓ 変換完了！${fileCount}ファイル、計${totalRows.toLocaleString()}行を処理しました。ダウンロード方法を選択してください。`);
        showDownloadOptions();
        
        setTimeout(() => {
            hideProgress();
        }, 1000);
        
    } catch (error) {
        console.error('エラー:', error);
        showStatus('error', `エラーが発生しました: ${error.message}`);
        hideProgress();
        hideDownloadOptions();
    }
}

// データ処理
function processData(jsonData, storeMaster) {
    // 品番の行を探す(行5)
    const headerRow = 5;
    const itemCodes = [];
    
    for (let col = 4; col < jsonData[headerRow].length; col++) {
        const code = jsonData[headerRow][col];
        if (code !== null && code !== undefined && code !== '') {
            itemCodes.push({
                code: String(code),
                colIndex: col
            });
        }
    }
    
    // データ開始行(行14)
    const dataStartRow = 14;
    
    const resultA = [];
    const resultB1 = [];
    const resultB2 = [];
    
    // ヘッダー行を追加(変換A、B-1)
    const headerA = '店舗コード,店舗名称,型番,品番,商品コード,商品名称,型番,入数,手持ち日数,ディスプレイ数,上限値,売上ランク,センター在庫,店舗在庫,廃盤,大分類,中分類,小分類,細分類,発注締め日,発注バラ数,タグ1,タグ2,タグ3,タグ4,タグ5,タグ6,タグ7,タグ8';
    resultA.push(headerA);
    resultB1.push(headerA);
    
    // 各店舗のデータを処理
    for (let row = dataStartRow; row < jsonData.length; row++) {
        const storeCode = jsonData[row][1];
        
        if (!storeCode || storeCode === null || storeCode === '') {
            continue;
        }
        
        const storeCodeStr = String(storeCode);
        
        // 各品番の配布数を処理
        for (const item of itemCodes) {
            const qty = jsonData[row][item.colIndex];
            
            if (qty !== null && qty !== undefined && qty !== '' && !isNaN(qty) && Number(qty) > 0) {
                const qtyNum = Number(qty);
                
                // 変換A: ディスプレイ数は配布数の半数(切り上げ)
                const displayQty = Math.ceil(qtyNum / 2);
                const lineA = `${storeCodeStr},,,${item.code},,,,,7,${displayQty},${qtyNum},,,,,,,,,,${qtyNum},,,,,,,,`;
                resultA.push(lineA);
                
                // 変換B-1: ディスプレイ数と上限値は空欄
                const lineB1 = `${storeCodeStr},,,${item.code},,,,,7,,,,,,,,,,,,,,,,,,,,`;
                resultB1.push(lineB1);
                
                // 変換B-2: 出荷情報（マスタ未登録でも出力、日付は空欄）
                const storeMasterInfo = storeMaster[storeCodeStr];
                let shipDateStr = '';
                let deliveryDateStr = '';
                
                if (storeMasterInfo) {
                    const shipDate = getNextWeekday(storeMasterInfo.shipDay);
                    const deliveryDate = new Date(shipDate);
                    deliveryDate.setDate(shipDate.getDate() + 1);
                    shipDateStr = formatDate(shipDate);
                    deliveryDateStr = formatDate(deliveryDate);
                } else {
                    console.warn(`店舗コード ${storeCodeStr} がマスタに見つかりません（出荷日・納品日は空欄）`);
                }
                
                const lineB2 = `0901,${storeCodeStr},${shipDateStr},${deliveryDateStr},131313,1,${item.code},${qtyNum},1`;
                resultB2.push(lineB2);
            }
        }
    }
    
    return {
        A: resultA,      // 配列のまま返す（分割処理のため）
        B1: resultB1,    // 配列のまま返す
        B2: resultB2     // 配列のまま返す
    };
}

// 配列を1000行ごとに分割（ヘッダーは各ファイルに含める）
function splitIntoChunks(dataArray, hasHeader = true) {
    const CHUNK_SIZE = 1000;
    const chunks = [];
    const header = hasHeader ? dataArray[0] : null;
    const data = hasHeader ? dataArray.slice(1) : dataArray;
    
    for (let i = 0; i < data.length; i += CHUNK_SIZE) {
        const chunk = data.slice(i, i + CHUNK_SIZE);
        if (hasHeader && header) {
            chunks.push([header, ...chunk]);
        } else {
            chunks.push(chunk);
        }
    }
    
    // データがない場合は空の配列を返す
    if (chunks.length === 0) {
        if (hasHeader && header) {
            chunks.push([header]);
        } else {
            chunks.push([]);
        }
    }
    
    return chunks;
}

// 日付フォーマット（yyyymmdd形式）
function formatDateForFileName(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// ZIPファイル作成とダウンロード
async function createZipAndDownload(results) {
    const zip = new JSZip();
    
    // タイムスタンプでフォルダ名を作成
    const now = new Date();
    const timestamp = formatDateTime(now);
    const dateStr = formatDateForFileName(now);
    const folderName = timestamp;
    
    // BOM付きUTF-8で保存
    const BOM = '\uFEFF';
    
    // 変換A（ヘッダーあり）を1000行ごとに分割
    const chunksA = splitIntoChunks(results.A, true);
    for (let i = 0; i < chunksA.length; i++) {
        const partNum = chunksA.length > 1 ? `_${String(i + 1).padStart(2, '0')}` : '';
        const fileName = `【雑貨】店舗DX出荷＆自補設定_${dateStr}${partNum}.csv`;
        zip.file(`${folderName}/${fileName}`, BOM + chunksA[i].join('\n'));
    }
    
    // 変換B-1（ヘッダーあり）を1000行ごとに分割
    const chunksB1 = splitIntoChunks(results.B1, true);
    for (let i = 0; i < chunksB1.length; i++) {
        const partNum = chunksB1.length > 1 ? `_${String(i + 1).padStart(2, '0')}` : '';
        const fileName = `【アパレル】店舗DX自補設定_${dateStr}${partNum}.csv`;
        zip.file(`${folderName}/${fileName}`, BOM + chunksB1[i].join('\n'));
    }
    
    // 変換B-2（ヘッダーなし）を1000行ごとに分割
    const chunksB2 = splitIntoChunks(results.B2, false);
    for (let i = 0; i < chunksB2.length; i++) {
        const partNum = chunksB2.length > 1 ? `_${String(i + 1).padStart(2, '0')}` : '';
        const fileName = `【アパレル】ロジザード出荷_${dateStr}${partNum}.csv`;
        zip.file(`${folderName}/${fileName}`, chunksB2[i].join('\n')); // B-2はBOMなし
    }
    
    const blob = await zip.generateAsync({ type: 'blob' });
    
    // ダウンロード
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `店舗DX_変換_${timestamp}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 個別ファイルダウンロード（時間差をつけてダウンロード）
async function downloadIndividualFiles(results) {
    const now = new Date();
    const dateStr = formatDateForFileName(now);
    const BOM = '\uFEFF';
    
    // 変換A（ヘッダーあり）を1000行ごとに分割
    const chunksA = splitIntoChunks(results.A, true);
    for (let i = 0; i < chunksA.length; i++) {
        const partNum = chunksA.length > 1 ? `_${String(i + 1).padStart(2, '0')}` : '';
        const fileName = `【雑貨】店舗DX出荷＆自補設定_${dateStr}${partNum}.csv`;
        downloadFile(BOM + chunksA[i].join('\n'), fileName, 'text/csv;charset=utf-8;');
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // 変換B-1（ヘッダーあり）を1000行ごとに分割
    const chunksB1 = splitIntoChunks(results.B1, true);
    for (let i = 0; i < chunksB1.length; i++) {
        const partNum = chunksB1.length > 1 ? `_${String(i + 1).padStart(2, '0')}` : '';
        const fileName = `【アパレル】店舗DX自補設定_${dateStr}${partNum}.csv`;
        downloadFile(BOM + chunksB1[i].join('\n'), fileName, 'text/csv;charset=utf-8;');
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // 変換B-2（ヘッダーなし）を1000行ごとに分割
    const chunksB2 = splitIntoChunks(results.B2, false);
    for (let i = 0; i < chunksB2.length; i++) {
        const partNum = chunksB2.length > 1 ? `_${String(i + 1).padStart(2, '0')}` : '';
        const fileName = `【アパレル】ロジザード出荷_${dateStr}${partNum}.csv`;
        downloadFile(chunksB2[i].join('\n'), fileName, 'text/csv;charset=utf-8;'); // B-2はBOMなし
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

// ファイルダウンロード共通関数
function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// タイムスタンプ生成(yyyymmddHHMM形式)
function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}`;
}

// ステータス表示
function showStatus(type, message) {
    status.className = `status ${type}`;
    status.innerHTML = message;
    status.style.display = 'block';
}

// プログレスバー表示
function showProgress(percent) {
    progressBar.style.display = 'block';
    progressFill.style.width = `${percent}%`;
}

// プログレスバー非表示
function hideProgress() {
    progressBar.style.display = 'none';
    progressFill.style.width = '0%';
}

// ダウンロードオプション表示
function showDownloadOptions() {
    document.getElementById('downloadOptions').style.display = 'block';
}

// ダウンロードオプション非表示
function hideDownloadOptions() {
    document.getElementById('downloadOptions').style.display = 'none';
}
