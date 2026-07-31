"use client";

import { useState } from "react";
import { profiles } from "../site-data";

export function AccessSimulator() {
  const [profileIndex, setProfileIndex] = useState(1);
  const [capabilities, setCapabilities] = useState([true, false, false]);
  const [duration, setDuration] = useState("24 часа");
  const activeProfile = profiles[profileIndex];
  const capabilityLabels = [
    "Текстовые сообщения",
    "Аудиозвонки",
    "Добавление в группы",
  ];

  const toggleCapability = (index: number) => {
    setCapabilities((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? !item : item)),
    );
  };

  return (
    <div className="access-lab" aria-label="Интерактивная модель отношения PAGER">
      <div className="access-lab__heading">
        <span>LIVE / МОДЕЛЬ ОТНОШЕНИЯ</span>
        <p>Измените профиль, правила и срок — получатель увидит только разрешённое.</p>
      </div>

      <div className="access-lab__mobile-result" aria-atomic="true">
        <span>Получатель видит</span>
        <b>{activeProfile[0]}</b>
        <i>{capabilities.filter(Boolean).length} из 3 способов</i>
        <i>{duration}</i>
      </div>

      <div className="access-lab__controls">
        <fieldset>
          <legend>01 / Профиль</legend>
          <div className="access-lab__profiles">
            {profiles.map(([title, image], index) => (
              <button
                type="button"
                className={index === profileIndex ? "is-active" : ""}
                aria-pressed={index === profileIndex}
                onClick={() => setProfileIndex(index)}
                key={title}
              >
                <img src={image} alt="" width="543" height="724" />
                <span>{title}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>02 / Правила</legend>
          <div className="access-lab__toggles">
            {capabilityLabels.map((label, index) => (
              <button
                type="button"
                role="switch"
                aria-checked={capabilities[index]}
                onClick={() => toggleCapability(index)}
                key={label}
              >
                <span>{label}</span>
                <i aria-hidden="true" />
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>03 / Срок</legend>
          <div className="access-lab__duration">
            {["24 часа", "7 дней", "Постоянно"].map((item) => (
              <button
                type="button"
                className={duration === item ? "is-active" : ""}
                aria-pressed={duration === item}
                onClick={() => setDuration(item)}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="access-lab__preview" aria-atomic="true">
        <div className="access-lab__preview-top">
          <span>ПОЛУЧАТЕЛЬ ВИДИТ</span>
          <b>@PAGER ID</b>
        </div>
        <div className="access-lab__identity">
          <img
            src={activeProfile[1]}
            alt={`Профиль «${activeProfile[0]}»`}
            width="543"
            height="724"
          />
          <div>
            <span>{activeProfile[2]}</span>
            <strong>{activeProfile[0]}</strong>
          </div>
        </div>
        <div className="access-lab__result">
          {capabilityLabels.map((label, index) => (
            <span key={label}>
              {label}
              <b className={capabilities[index] ? "is-open" : ""}>
                {capabilities[index] ? "Разрешено" : "Закрыто"}
              </b>
            </span>
          ))}
        </div>
        <div className="access-lab__expires">
          <span>СРОК ОТНОШЕНИЯ</span>
          <b>{duration}</b>
        </div>
      </div>
    </div>
  );
}
