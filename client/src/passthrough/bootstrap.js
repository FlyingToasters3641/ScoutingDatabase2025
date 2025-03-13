import { classNames } from 'primereact/utils';

const Bootstrap_PT = {
  button: {
    root: ({ props, context }) => ({
      className: classNames(
        'btn px-4 py-3',
        {
          'btn btn-block btn-primary': props.severity === null,
        },
        {
          'btn-secondary': props.severity === 'secondary',
          'btn-success': props.severity === 'success',
          'btn-info': props.severity === 'info',
          'btn-warning': props.severity === 'warning',
          'btn-purple': props.severity === 'help',
          'btn-danger': props.severity === 'danger',
        },
        {
          'shadow-lg': props.raised,
        },
        {
          'opacity-25 disabled': context.disabled,
        }
      ),
    }),
  },
  inputtext: {
    root: {
      className: 'm-0 form-control p-3 text-base',
    },
  },
  inputtextarea: {
    root: {
      className: 'm-0 form-control p-3 text-base',
    },
  },
  panel: {
    root: {
      className: 'rounded border',
    },
    header: {
      className:
        'text-white rounded-top bg-primary p-3 d-flex align-items-center justify-content-between',
      style: { borderBottom: '1px solid #0d6efd' },
    },
    content: {
      className: 'p-3  d-flex align-items-center justify-content-between',
    },
    toggler: {
      className: classNames(
        'd-inline-flex align-items-center justify-content-center position-relative text-white btn btn-primary border-0 '
      ),
    },
  },
  progressbar: {
    root: {
      className: 'position-relative overflow-hidden border-0 rounded',
      style: { height: '1.5rem', backgroundColor: '#edf2f7' },
    },
    value: {
      className: classNames(
        'border-0 bg-primary position-absolute align-items-center border-0 d-flex h-100 justify-content-center overflow-hidden'
      ),
    },
    label: {
      className: 'd-inline-flex text-white small',
    },
  },
  menu: {
    root: {
      className: 'py-1 bg-white border rounded',
      style: { width: '12rem' },
    },
    menu: {
      className: 'm-0 p-0',
      style: { listStyle: 'none' },
    },
    action: () => ({
      className: classNames('text-dark py-2 px-3 d-flex align-items-center'),
      style: { textDecoration: 'none', cursor: 'pointer' },
    }),
  },
  dialog: {
    mask: ({ state }) => ({
      class: classNames('modal fade opacity-0', {
        'show opacity-100': state.containerVisible,
      }),
      style: {
        backgroundColor: 'rgba(0, 0, 0, .5)',
      },
    }),
    root: { className: 'modal-dialog modal-content' },
    header: { className: 'modal-header' },
    content: { className: 'modal-body' },
    closeButton: { className: 'btn' },
  },
};

export default Bootstrap_PT;
