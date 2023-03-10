import React from 'react';
import { Link } from "@remix-run/react";
import { capitalize } from '~/utils/strings';

type Props = {
  content: 'edit-snapshot-policy' | 'performance-metrics'
}

function Navigation(props: Props) {
  const { content } = props;
  return (
    <div className="navigation">
      <div className="navigation-header">
        <div className="navigation-header-logo">
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.62 14.5587H20.6219V18.3712C20.6219 20.0736 21.7318 21.1766 23.4321 21.2006H25.6047C26.5494 21.2246 27.1397 21.8 27.1397 22.7352C27.1634 23.9101 27.1634 25.109 27.1634 26.284C27.187 27.0752 26.5966 27.7466 25.7937 27.7706H25.6756C24.4712 27.7946 23.2905 27.7946 22.0861 27.7706C21.3068 27.7946 20.6455 27.1711 20.6219 26.3799V26.26V23.8382C20.5983 22.2077 19.5829 21.1526 17.9534 21.1526H10.3257C8.01138 21.1766 6.5 19.642 6.5 17.3161V10.6262C6.5 10.4842 6.506 10.3449 6.51781 10.2086V9.51494C6.54143 8.0283 5.36066 6.82939 3.89652 6.80541H1.53499C0.566766 6.78143 0 6.22994 0 5.24683V1.74603C0 0.786901 0.566766 0.211426 1.53499 0.211426H4.95921C5.95105 0.211426 6.51781 0.786901 6.51781 1.77V3.97599C6.51781 5.79833 7.50965 6.80541 9.30441 6.80541H16.9085C19.1284 6.80541 20.62 8.34001 20.62 10.6179V14.5587Z"
              fill="#0098C5"
            />
            <path
              d="M9 12.5C9 10.8431 10.3431 9.5 12 9.5H15C16.6569 9.5 18 10.8431 18 12.5V15.5C18 17.1569 16.6569 18.5 15 18.5H12C10.3431 18.5 9 17.1569 9 15.5V12.5Z"
              fill="#114E85"
            />
          </svg>
        </div>
        <div className="navigation-header-name" title="[Cluster Name]">
          <span className="ellipsis">[Cluster Name]</span>
        </div>
      </div>
      <div className="navigation-menu">
        <div className={`${content === 'performance-metrics' && 'selected'} navigation-menu-item`} title="Performance Metrics">
          <Link className="no-decoration" to="/performance-metrics">Performance Metrics</Link>
        </div>
        <div className={`${content === 'edit-snapshot-policy' && 'selected'} navigation-menu-item`} title="Edit Snapshot Policy">
          <Link className="no-decoration" to="/edit-snapshot-policy">Edit Snapshot Policy</Link>
        </div>
      </div>
      <div className="navigation-footer">
        <div className="navigation-user">
          <div className="navigation-user-name">
            <div className="circle-white">S</div>
            <div className="">AD\User</div>
          </div>
          <div className="">
            <svg
              width="8"
              height="5"
              viewBox="0 0 8 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.49374 3.9875L1.11249 1.60625C0.874994 1.36875 0.818745 1.09688 0.943745 0.790628C1.06874 0.484378 1.29999 0.331253 1.63749 0.331253H6.39999C6.72499 0.331253 6.95 0.484378 7.075 0.790628C7.2 1.09688 7.14374 1.36875 6.90624 1.60625L4.52499 3.9875C4.44999 4.0625 4.36874 4.11563 4.28124 4.14688C4.19374 4.17813 4.10624 4.19375 4.01874 4.19375C3.90624 4.19375 3.80937 4.17813 3.72812 4.14688C3.64687 4.11563 3.56874 4.0625 3.49374 3.9875Z"
                fill="#F3F4F4"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
