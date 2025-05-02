import React, {useState} from 'react';
import classNames from 'classnames';

import "./sidebar.scss"


const MENU_ITEMS = [
    {key: 'popular', text: 'Популярное'},
    {key: 'fresh', text: 'Свежее'},
];


const Sidebar: React.FC = () => {
    const [activeKey, setActiveKey] = useState('popular');

    return (
        <aside className="sidebar">

            <ul className="sidebar__list">
                {MENU_ITEMS.map(({key, text}) => (<li
                    key={key}
                    className={classNames('sidebar__item', {
                        'sidebar__item--active': activeKey === key,
                    })}
                    onClick={() => setActiveKey(key)}
                >
                    {text}
                </li>))}
            </ul>

        </aside>
    );
};

export default Sidebar;