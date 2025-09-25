/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Modality } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const STYLES = [
    {
      title: '1900s Look',
      prompt: '请重新构想照片中的人物，使其完全符合1900年代的风格。这包括人物的服装、发型、照片的整体画质和滤镜和构图，以及该年代所特有的整体美学风格。最终输出必须是高度逼真的图像，并清晰地展现人物。'
    },
    {
      title: '1950s Look',
      prompt: '请重新构想照片中的人物，使其完全符合1950年代的风格。这包括人物的服装、发型、照片的整体画质和滤镜和构图，以及该年代所特有的整体美学风格。最终输出必须是高度逼真的图像，并清晰地展现人物。'
    },
    {
      title: 'ID Photo',
      prompt: '截取图片人像头部，帮我做成 2 寸证件照，要求： 1、白底 2、职业正装 3、正脸 4、微笑'
    },
    {
      title: 'Poses in Black & White',
      prompt: '高分辨率的黑白肖像摄影作品，采用编辑类与艺术摄影风格。保持人物面部特征一致，仅改变姿态与构图。背景为柔和渐变，从中灰过渡到近乎纯白，配合细腻的胶片颗粒质感，营造经典黑白影像的氛围。主体为照片中人物，衣着不变，以不同随机姿态出现：抬手触脸、手指交叠于胸前、用手部分遮挡面容、轻触下颌等，强调自然、优雅的手部动作。面部依旧保留原有神态，只在角度和光线中体现变化，局部捕捉眼神、颧骨或唇角的细节。光线为温柔的定向光，柔和地勾勒出脸部、手部与 T 恤的纹理；画面简洁，留有大面积负空间。没有文字或标志，只有光影、姿态与情绪交织。整体氛围亲密、永恒，像呼吸或思索间的停顿，被捕捉为诗意的瞬间。'
    },
    {
      title: 'Hyper-realistic Adventure',
      prompt: '一幅超写实、电影感的插画，描绘了人物动态地撞穿一张“考古探险”集换卡牌的边框。她正处于跳跃中或用绳索摆荡，穿着标志性的冒险装备，可能正在使用双枪射击，枪口的火焰帮助将卡牌古老的石雕边框震碎，在破口周围制造出可见的维度破裂效果，如能量裂纹和空间扭曲，使灰尘和碎片四散飞溅。她的身体充满活力地向前冲出，带有明显的运动深度，突破了卡牌的平面，卡牌内部（背景）描绘着茂密的丛林遗迹或布满陷阱的古墓内部。卡牌的碎屑与 crumbling 的石头、飞舞的藤蔓、古钱币碎片和用过的弹壳混合在一起。“考古探险”的标题和“人物”的名字（带有一个风格化的文物图标）在卡牌剩余的、布满裂纹和风化痕迹的部分上可见。充满冒险感的、动态的灯光突出了她的运动能力和危险的环境。'
    },
    {
      title: 'Cinematic Feel',
      prompt: 'Enhance this photo with cinematic lighting, improve brightness and contrast, boost colors, and crop unnecessary background details to make it look like a professional movie shot.'
    },
    {
      title: 'Cartoon Sticker',
      prompt: 'Turn the character into a cute cartoon sticker with bold outlines, playful facial expression, and a short white caption. Keep the original identity consistent.'
    },
    {
      title: 'AR Annotations',
      prompt: 'Highlight the point of interest in this image (such as a building or object) and generate AR-style annotation cards with accurate descriptions and historical context.'
    },
    {
      title: 'Pop Art Portrait',
      prompt: 'Transform the person in the photo into a vibrant pop art portrait, in the style of Andy Warhol. Use bold, contrasting colors and a silkscreen effect. The final image should be a single, striking portrait.'
    },
    {
      title: 'Plush Toy',
      prompt: 'A soft, high-quality plush toy of image, with an oversized head, small body, and stubby limbs. Made of fuzzy fabric with visible stitching and embroidered facial features. The plush is shown sitting or standing against a neutral background. The expression is cute or expressive, and it wears simple clothes or iconic accessories if relevant. Lighting is soft and even, with a realistic, collectible plush look. Centered, full-body view.'
    },
    {
      title: 'Clay Doll',
      prompt: '将人物转换成手工黏土玩偶(黏土材质)，主体动作保持不变，放置在铺着切割垫的黏土手工工作台上，旁边支架上立着一张参考图写实照片作为创作参照，工作台上散落着几块不同色泽的黏土、一把雕刻刀和各种塑形工具，有温暖的台灯光线。'
    },
    {
      title: 'Natural Light Portrait',
      prompt: '帮我生成一张日式职业照。优先自然光照与阴影建模，模拟真实光线行为（柔和衰减、间接反射光、精准高光定位），以光线定义形态、情绪与材质本质。尤其需自然照亮含蓄微笑 -- 法令纹处保留柔和阴影，增强表情层次却不显刻意。'
    },
    {
      title: 'Surreal Giant Baby',
      prompt: '脸不要变，去除全部背景，新生成图片：这张图片以极具冲击力的超现实主义视角，展现了宝宝变成了巨人宝宝爬着，一只手撑进乐高乐园里。巨人宝宝皮肤白皙红润，表情自然，服装是以经典游戏角色马里奥的服饰为原型设计的婴幼儿装扮，主要由以下几部分构成：红色帽子带有标志性的白色“M”字母标识，这是马里奥形象的核心元素之一，色彩鲜艳且极具辨识度。红色上衣作为内搭，与帽子颜色相呼应，形成统一的视觉风格。蓝色背带裤：整体版型宽松，适合婴幼儿活动；裤身配有黄色圆形装饰扣，上面也印有“M”字母，细节处还原了马里奥服饰的特征，同时增添了童趣感。红色袜子：与帽子、上衣的红色形成呼应，让整套穿搭的色彩搭配更协调。宝宝正脸面对镜头。采用极端的低角度仰拍，使观者如同街上的行人般渺小，仰望这震撼的一幕。背景是细节丰富的复古都市景观，交通信号灯、车辆和行人点缀其间，营造出真实又疏离的都市氛围。巨人宝宝与微缩城市之间形成极致的尺度对比，人物与建筑产生强烈视觉分离，奇幻的叙事与仰视的构图共同造就了这幅充满压迫感与戏剧张力的非凡影像。'
    },
    {
      title: 'Hand-held Polaroid',
      prompt: '宝丽来照片，被手握着照片的一角，画面中是参考图片，柔和暖光在海边投下影子，胶片质感，写实且具清新艺术感'
    }
];


type AppState = 'idle' | 'loading' | 'results';

interface UploadedImage {
  base64: string;
  mimeType: string;
}

interface GeneratedImage {
    src: string;
    title: string;
    prompt: string;
}

interface HistoryItem {
    id: string;
    uploadedImage: UploadedImage;
    generatedImages: GeneratedImage[];
}

let currentState: AppState = 'idle';
let uploadedImage: UploadedImage | null = null;
let generatedImages: GeneratedImage[] = [];
let selectedImage: GeneratedImage | null = null;
let isRegenerating = false;
let history: HistoryItem[] = [];
let isHistoryOpen = false;


const root = document.getElementById('root');

// --- History Functions ---
function saveHistory() {
    localStorage.setItem('imageDesignerHistory', JSON.stringify(history));
}

function loadHistory() {
    const savedHistory = localStorage.getItem('imageDesignerHistory');
    if (savedHistory) {
        history = JSON.parse(savedHistory);
    }
}

function setHistoryOpen(isOpen: boolean) {
    isHistoryOpen = isOpen;
    render();
}

function handleHistoryItemClick(item: HistoryItem) {
    uploadedImage = item.uploadedImage;
    generatedImages = item.generatedImages;
    setHistoryOpen(false);
    setState('results');
}

function handleClearHistory() {
    if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
        history = [];
        saveHistory();
        render(); // Re-render to show empty history panel
    }
}
// --- End History Functions ---

function setState(newState: AppState) {
  currentState = newState;
  render();
}

function setSelectedImage(image: GeneratedImage | null) {
    selectedImage = image;
    render();
}

async function generateSingleImage(prompt: string, title: string, originalImage: UploadedImage): Promise<GeneratedImage | null> {
    try {
        const imagePart = {
            inlineData: {
                data: originalImage.base64.split(',')[1],
                mimeType: originalImage.mimeType,
            },
        };
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: { parts: [imagePart, { text: prompt }] },
            config: { responseModalities: [Modality.IMAGE, Modality.TEXT] },
        });

        for (const part of response.candidates?.[0]?.content?.parts ?? []) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                return {
                    src: `data:${originalImage.mimeType};base64,${base64ImageBytes}`,
                    title,
                    prompt,
                };
            }
        }
        return null;
    } catch (error) {
        console.error(`Error generating style "${title}":`, error);
        return null;
    }
}


async function generateStyledImages(image: UploadedImage) {
    const generationPromises = STYLES.map(style =>
        generateSingleImage(style.prompt, style.title, image)
    );

    const results = await Promise.all(generationPromises);
    generatedImages = results.filter(result => result !== null) as GeneratedImage[];
}

async function handleRegenerate() {
    if (!selectedImage || !uploadedImage || isRegenerating) return;

    isRegenerating = true;
    render(); // Show loading state in modal

    const newImage = await generateSingleImage(selectedImage.prompt, selectedImage.title, uploadedImage);
    
    isRegenerating = false;

    if (newImage) {
        // Update the image in the main array
        const index = generatedImages.findIndex(img => img.prompt === selectedImage!.prompt);
        if (index !== -1) {
            generatedImages[index] = newImage;
        }
        // Update the selected image for the modal
        selectedImage = newImage;
    } else {
        alert('Failed to regenerate the image. Please try again.');
    }
    render();
}


function handleFileSelect(file: File) {
  if (!file || !file.type.startsWith('image/')) {
    alert('Please select an image file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64 = e.target?.result as string;
    uploadedImage = {
      base64,
      mimeType: file.type,
    };
    
    setState('loading');
    
    await generateStyledImages(uploadedImage);

    if (generatedImages.length === 0) {
        alert("Sorry, we couldn't generate any styles for your image. Please try another one.");
        setState('idle');
        return;
    }

    const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        uploadedImage,
        generatedImages,
    };
    history.unshift(newHistoryItem);
    saveHistory();
    
    setState('results');
  };
  reader.readAsDataURL(file);
}

function createHistoryButton(): HTMLElement {
    const button = document.createElement('button');
    button.className = 'p-2 rounded-full hover:bg-black/10 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400';
    button.setAttribute('aria-label', 'View history');
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    `;
    button.onclick = () => setHistoryOpen(true);
    return button;
}

function createIdleScreen(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-rose-100 via-purple-100 to-amber-100';
  
  const historyButtonContainer = document.createElement('div');
  historyButtonContainer.className = 'absolute top-4 right-4 z-10';
  historyButtonContainer.appendChild(createHistoryButton());
  container.appendChild(historyButtonContainer);

  container.innerHTML += `
    <div class="text-center" style="opacity:0; animation: fadeIn 1s ease-out forwards;">
      <h1 class="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-slate-700 tracking-tight">
        Multi-Style Image Designer
      </h1>
      <p class="text-slate-500 mt-3 text-lg">
        Upload a photo and transform it with avant-garde styles.
      </p>
    </div>
    <div class="mt-10 w-full max-w-lg bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border-2 border-white" style="opacity:0; animation: fadeIn 1s 0.5s ease-out forwards;">
      <label for="file-upload" class="flex flex-col items-center justify-center w-full h-64 border-4 border-dashed border-pink-300 rounded-xl cursor-pointer hover:bg-pink-50 hover:border-pink-400 transition-all duration-300">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-10 h-10 mb-4 text-pink-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-600"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500">PNG, JPG, or other image formats</p>
        </div>
        <input id="file-upload" type="file" class="hidden" accept="image/*" />
      </label>
    </div>
    <style>
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>
  `;
  
  const fileInput = container.querySelector('#file-upload') as HTMLInputElement;
  const dropZone = container.querySelector('label');

  fileInput.addEventListener('change', (e) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  });

  const preventDefaults = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  };

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone?.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone?.addEventListener(eventName, () => {
      dropZone?.classList.add('bg-pink-50', 'border-pink-400');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone?.addEventListener(eventName, () => {
      dropZone?.classList.remove('bg-pink-50', 'border-pink-400');
    }, false);
  });

  dropZone?.addEventListener('drop', (e) => {
    const dt = (e as DragEvent).dataTransfer;
    const files = dt?.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  });

  return container;
}

function createLoadingScreen(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-rose-100 via-purple-100 to-amber-100';
    container.innerHTML = `
        <div class="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-pink-500"></div>
        <p class="text-slate-600 text-2xl font-semibold mt-8">Generating your new look...</p>
    `;
    return container;
}

function createResultsScreen(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'min-h-screen w-full bg-gradient-to-br from-rose-100 via-purple-100 to-amber-100 p-4 sm:p-6 lg:p-8 flex flex-col';

    const header = document.createElement('div');
    header.className = 'flex-shrink-0 flex justify-between items-center mb-6 max-w-7xl mx-auto w-full';
    
    const title = document.createElement('h2');
    title.className = 'font-serif text-4xl font-bold text-slate-700';
    title.textContent = 'Your Styles';
    header.appendChild(title);

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'flex items-center gap-2';

    const startOverButton = document.createElement('button');
    startOverButton.textContent = 'Start Over';
    startOverButton.className = 'px-6 py-2 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75';
    startOverButton.onclick = () => {
        uploadedImage = null;
        generatedImages = [];
        setState('idle');
    };

    buttonGroup.appendChild(startOverButton);
    buttonGroup.appendChild(createHistoryButton());
    header.appendChild(buttonGroup);
    
    container.appendChild(header);

    const galleryContainer = document.createElement('div');
    galleryContainer.className = 'flex-grow w-full max-w-7xl mx-auto overflow-y-auto';
    
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-1';
    
    generatedImages.forEach((image) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'aspect-[3/4] rounded-xl overflow-hidden shadow-2xl bg-white/50 border-2 border-white transform hover:scale-105 transition-transform duration-300 group cursor-pointer';
        
        const card = document.createElement('div');
        card.className = 'w-full h-full relative';

        const img = document.createElement('img');
        img.src = image.src;
        img.className = 'w-full h-full object-cover';
        img.alt = image.title;
        
        const titleOverlay = document.createElement('div');
        titleOverlay.className = 'absolute bottom-0 left-0 right-0 p-3 bg-black/60 text-white text-center font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300';
        titleOverlay.textContent = image.title;

        card.appendChild(img);
        card.appendChild(titleOverlay);
        imageWrapper.appendChild(card);
        grid.appendChild(imageWrapper);

        imageWrapper.addEventListener('click', () => {
            setSelectedImage(image);
        });
    });
    
    galleryContainer.appendChild(grid);
    container.appendChild(galleryContainer);
    
    return container;
}

function createImageModal(): HTMLElement | null {
    if (!selectedImage) return null;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeInModal';

    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row gap-4 p-4 animate-scaleInModal';
    
    const imageContainer = document.createElement('div');
    imageContainer.className = 'w-full md:w-2/3 h-96 md:h-auto relative flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden';
    
    const img = document.createElement('img');
    img.src = selectedImage.src;
    img.className = 'block max-w-full max-h-full h-auto object-contain';
    img.alt = selectedImage.title;
    imageContainer.appendChild(img);

    if (isRegenerating) {
        const spinner = document.createElement('div');
        spinner.className = 'absolute inset-0 flex items-center justify-center bg-white/50';
        spinner.innerHTML = `<div class="w-12 h-12 border-8 border-dashed rounded-full animate-spin border-pink-500"></div>`;
        imageContainer.appendChild(spinner);
    }
    
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'w-full md:w-1/3 flex flex-col justify-between';

    const textContent = document.createElement('div');
    textContent.innerHTML = `<h3 class="font-serif text-3xl font-bold text-slate-800">${selectedImage.title}</h3>`;

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'mt-4 space-y-3';
    
    const regenerateButton = document.createElement('button');
    regenerateButton.innerHTML = `<svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 11M20 20l-1.5-1.5A9 9 0 003.5 13"/></svg>Regenerate`;
    regenerateButton.className = 'w-full flex items-center justify-center px-4 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed';
    regenerateButton.disabled = isRegenerating;
    regenerateButton.onclick = handleRegenerate;
    
    const downloadButton = document.createElement('button');
    downloadButton.innerHTML = `<svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>Download`;
    downloadButton.className = 'w-full flex items-center justify-center px-4 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition-colors';
    downloadButton.onclick = () => {
        const a = document.createElement('a');
        a.href = selectedImage!.src;
        a.download = `${selectedImage!.title.replace(/\s/g, '_')}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    buttonGroup.appendChild(regenerateButton);
    buttonGroup.appendChild(downloadButton);

    controlsContainer.appendChild(textContent);
    controlsContainer.appendChild(buttonGroup);

    modalContent.appendChild(imageContainer);
    modalContent.appendChild(controlsContainer);
    modal.appendChild(modalContent);
    
    const closeButton = document.createElement('button');
    closeButton.className = 'absolute top-4 right-4 text-white hover:text-pink-300 text-5xl font-bold';
    closeButton.innerHTML = '&times;';
    
    const closeModal = () => setSelectedImage(null);
    closeButton.onclick = closeModal;
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    modal.appendChild(closeButton);

    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInModal {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleInModal {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeInModal { animation: fadeInModal 0.3s ease-out forwards; }
        .animate-scaleInModal { animation: scaleInModal 0.3s ease-out forwards; }
    `;
    modal.appendChild(style);

    return modal;
}

function createHistoryPanel(): HTMLElement {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/50 z-40 animate-fadeInModal';
    overlay.onclick = () => setHistoryOpen(false);

    const panel = document.createElement('div');
    panel.className = 'fixed top-0 right-0 h-full w-full max-w-sm bg-white/90 backdrop-blur-lg shadow-2xl flex flex-col animate-slideIn';
    panel.onclick = (e) => e.stopPropagation(); // Prevent closing when clicking inside panel

    const header = document.createElement('div');
    header.className = 'flex-shrink-0 p-4 border-b flex justify-between items-center';
    header.innerHTML = `<h3 class="font-serif text-2xl font-bold text-slate-700">History</h3>`;

    const closeButton = document.createElement('button');
    closeButton.className = 'p-2 rounded-full hover:bg-black/10 transition-colors';
    closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`;
    closeButton.onclick = () => setHistoryOpen(false);
    header.appendChild(closeButton);

    const content = document.createElement('div');
    content.className = 'flex-grow overflow-y-auto p-2';

    if (history.length === 0) {
        content.innerHTML = `<div class="h-full flex items-center justify-center text-slate-500">No history yet.</div>`;
    } else {
        const list = document.createElement('ul');
        list.className = 'space-y-2';
        history.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex items-center p-2 rounded-lg hover:bg-gray-200/50 transition-colors cursor-pointer';
            li.onclick = () => handleHistoryItemClick(item);

            const img = document.createElement('img');
            img.src = item.uploadedImage.base64;
            img.className = 'w-16 h-16 object-cover rounded-md mr-4 border';
            
            const text = document.createElement('span');
            text.className = 'text-slate-700 font-medium';
            text.textContent = `Generated on ${new Date(parseInt(item.id)).toLocaleDateString()}`;

            li.appendChild(img);
            li.appendChild(text);
            list.appendChild(li);
        });
        content.appendChild(list);
    }
    
    const footer = document.createElement('div');
    footer.className = 'flex-shrink-0 p-4 border-t';
    
    const clearButton = document.createElement('button');
    clearButton.className = 'w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors disabled:bg-gray-400';
    clearButton.textContent = 'Clear History';
    clearButton.disabled = history.length === 0;
    clearButton.onclick = handleClearHistory;
    footer.appendChild(clearButton);

    panel.appendChild(header);
    panel.appendChild(content);
    panel.appendChild(footer);
    overlay.appendChild(panel);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }
      .animate-slideIn { animation: slideIn 0.3s ease-out forwards; }
    `;
    overlay.appendChild(style);

    return overlay;
}


function render() {
  if (!root) return;
  
  root.innerHTML = '';
  
  let screen: HTMLElement | null = null;
  switch(currentState) {
    case 'idle':
      screen = createIdleScreen();
      break;
    case 'loading':
      screen = createLoadingScreen();
      break;
    case 'results':
      screen = createResultsScreen();
      break;
  }
  if (screen) {
      root.appendChild(screen);
  }

  if (isHistoryOpen) {
    const historyPanel = createHistoryPanel();
    root.appendChild(historyPanel);
  }

  if (selectedImage) {
      const modal = createImageModal();
      if (modal) root.appendChild(modal);
  }
}

// Initial Load
loadHistory();
render();
