import React, { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import './Setting.css';

function Setting() {
    const [showSettings, setShowSettings] = useState(false);
    const [randomSetting1, setRandomSetting1] = useState(false);
    const [randomSetting2, setRandomSetting2] = useState('Option 1');
    const [randomSetting3, setRandomSetting3] = useState(10);

    const toggleSettings = () => {
        setShowSettings((prevShowSettings) => !prevShowSettings);
    };

    const toggleRandomSetting1 = () => {
        setRandomSetting1(!randomSetting1);
    };

    const handleRandomSetting2Change = (event) => {
        setRandomSetting2(event.target.value);
    };

    const handleRandomSetting3Change = (event) => {
        setRandomSetting3(parseInt(event.target.value));
    };

    return (
        <div className='app-container'>
            <SettingsIcon onClick={toggleSettings} />
            <div className={`settings-sidebar ${showSettings ? 'open' : ''}`}>
                <h2>Settings Menu</h2>
                <div>
                    <input
                        type='checkbox'
                        checked={randomSetting1}
                        onChange={toggleRandomSetting1}
                    />
                    <label>Random Setting 1</label>
                </div>
                <div>
                    <label>Random Setting 2:</label>
                    <select
                        value={randomSetting2}
                        onChange={handleRandomSetting2Change}
                    >
                        <option value='Option 1'>Option 1</option>
                        <option value='Option 2'>Option 2</option>
                        <option value='Option 3'>Option 3</option>
                    </select>
                </div>
                <div>
                    <label>Random Setting 3:</label>
                    <input
                        type='number'
                        value={randomSetting3}
                        onChange={handleRandomSetting3Change}
                    />
                </div>
            </div>
        </div>
    );
}
export default Setting;
