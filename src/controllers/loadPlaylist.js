import nodeID3 from "node-id3";

export const playlistData = (data) => {
  let playlistData = [];
  let base64;
  for (let i = 0; i < data.length; i++) {
    const saveMusicData = nodeID3.read(data[i].fileUrl);
    if (saveMusicData.image) {
      base64 = new Buffer.from(saveMusicData.image.imageBuffer).toString(
        "base64"
      );
    }
    let saveMusicData2 = {
      fileUrl: data[i].fileUrl,
      title: saveMusicData.title,
      artist: saveMusicData.artist,
      _id: data[i]._id,
      img: `data:image/jpeg;base64,${base64}`,
    };
    playlistData.push(saveMusicData2);
  }

  return playlistData;
};

export const uploadData = (data) => {
  let uploadMusicData = [];
  let imgData = "nuknown";
  for (let i = 0; i < data.length; i++) {
    const saveMusicData = nodeID3.read(data[i].fileUrl);
    if (saveMusicData.image) {
      const base64 = new Buffer.from(saveMusicData.image.imageBuffer).toString(
        "base64"
      );
      imgData = `data:image/jpeg;base64,${base64}`;
    }
    let saveMusicData2 = {
      fileUrl: data[i].fileUrl,
      title: saveMusicData.title,
      artist: saveMusicData.artist,
      _id: data[i]._id,
      like: data[i].like,
      img: imgData,
    };
    uploadMusicData.push(saveMusicData2);
  }
  return uploadMusicData;
};

export const allMusic = (data) => {
  let allMusic = [];
  let imgData = "nuknown";
  for (let i = 0; i < data.length; i++) {
    const saveMusicData = nodeID3.read(data[i].fileUrl);
    if (saveMusicData.image) {
      const base64 = new Buffer.from(saveMusicData.image.imageBuffer).toString(
        "base64"
      );
      imgData = `data:image/jpeg;base64,${base64}`;
    }
    let saveMusicData2 = {
      fileUrl: data[i].fileUrl,
      title: saveMusicData.title,
      artist: saveMusicData.artist,
      _id: data[i]._id,
      like: data[i].like,
      img: imgData,
    };
    allMusic.push(saveMusicData2);
  }
  return allMusic;
};

export const nodeID3Read = (data) => {
  const musicData = nodeID3.read(data);
  const lyrics = musicData.unsynchronisedLyrics
    ? musicData.unsynchronisedLyrics.text
    : "aa";
  if (musicData.unsynchronisedLyrics) {
    musicData.unsynchronisedLyrics.text = lyrics.replace(/\r\n/g, "<br>");
  }
  // console.log(musicData);
  return musicData;
};
