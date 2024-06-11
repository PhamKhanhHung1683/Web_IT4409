import ReactDOM from 'react-dom';
import styles from './ModalWrapper.module.scss';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { CloseIcon } from '../icons';

const cx = classNames.bind(styles);
function ModalWrapper({ children, isShowing, hide, className, title }) {
    useEffect(() => {
        if (isShowing) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'scroll';
    }, [isShowing]);
    return isShowing
        ? ReactDOM.createPortal(
              <div className={cx('wrapper')} onClick={()=>hide()}>
                  <div className={cx('inner', { [className]: className })} onClick={(e)=>{e.stopPropagation()}}>
                      <div className={cx('header')}>
                          <div className={cx('title')}>{title}</div>
                          <button
                              className={cx('close-btn')}
                              onClick={() => {
                                  hide();
                              }}
                          >
                              <CloseIcon className={cx('close-icon')}/>
                          </button>
                      </div>
                      <div className={cx('content')}>{children}</div>
                  </div>
              </div>,
              document.body,
          )
        : '';
}

export default ModalWrapper;
