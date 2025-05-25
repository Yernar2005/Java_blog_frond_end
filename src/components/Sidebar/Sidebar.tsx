import React, {useState} from 'react';
import classNames from 'classnames';

import "./sidebar.scss"


const MENU_ITEMS = [
    {key: 'old', text: 'Старые'},
    {key: 'fresh', text: 'Свежее'},
];


const Sidebar: React.FC = () => {
    const [activeKey, setActiveKey] = useState('popular');

    return (
        <aside className="sidebar">
            <ul className="sidebar__list">
                {MENU_ITEMS.map(({ key, text }) => (
                    <li key={key} className="sidebar__item">
                        <div className="btn">
                            <div
                                className={classNames('btn_item', {
                                    'btn_item--active': activeKey === key,
                                })}
                                onClick={() => setActiveKey(key)}
                            >
                                <span>{text}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;