import React from "react";
import ReactSlider from "react-slider";
import styles from "./controls.module.css";

export default function Controls({ settings, setSettings }) {
  const onChange = (value, key) => setSettings({ ...settings, [key]: value });

  return (
    <div className={styles.controls}>
      <Slider
        label="From Width"
        onChange={(value) => onChange(value, "fromWidth")}
        value={settings.fromWidth}
      />
      <Slider
        label="To Width"
        onChange={(value) => onChange(value, "toWidth")}
        value={settings.toWidth}
      />
      <Slider
        label="From Height"
        onChange={(value) => onChange(value, "fromHeight")}
        value={settings.fromHeight}
      />
      <Slider
        label="To Height"
        onChange={(value) => onChange(value, "toHeight")}
        value={settings.toHeight}
      />
    </div>
  );
}

const Slider = ({ label, onChange, value }) => (
  <div className={styles.sliderHolder}>
    <span className={styles.label}>{label}: </span>
    <ReactSlider
      className={styles.slider}
      onChange={onChange}
      min={1}
      max={800}
      value={value}
      thumbClassName={styles.thumb}
      trackClassName={styles.track}
      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    />
  </div>
);
