import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import styles from './VideoPlayer.module.css';

export default function VideoPlayer() {
  const [scriptHtml, setScriptHtml] = useState('');

  useEffect(() => {
    const dataUrl = window.location.href;
    fetch(
      '//pleer.videoplayers.club/get_player?w=610&h=370&type=widget&kp_id=&players=videocdn,hdvb,bazon,alloha,ustore,kodik,trailer,torrent&r_id=videoplayers&vni=VIDEOCDN&vti=&vdi=&hni=HDVB&hti=&hdi=&bni=BAZON&bti=&bdi=&alni=ALLOHATV&alti=&aldi=&usni=USTOREBZ&usti=&usdi=&koni=KODIK&koti=&kodi=&tti=&ru=' +
        dataUrl,
    )
      .then(res => res.text())
      .then(data => {
        const script = data.match(/<iframe.*<\/iframe>/gm);
        if (script !== null) {
          setScriptHtml(script[1]);
        }
      })
      .catch(error => console.error(error));
  }, []);
  return (
    <div
      className={classNames('uitools', styles.video)}
      id="videoplayers"
      dangerouslySetInnerHTML={{ __html: scriptHtml }}
    ></div>
  );
}
