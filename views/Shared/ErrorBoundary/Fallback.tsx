import React from 'react'
import PropTypes from 'prop-types'

interface ErrorProps {
  errorInfo: React.ErrorInfo | null
  errorId?: string
}

const Error = ({ errorInfo = { componentStack: 'error' }, errorId }: ErrorProps) => (
  <div>
    <p>There was an error in loading this page.</p>
    <button
      style={{ cursor: 'pointer', color: '#0077FF' }}
      onClick={() => {
        window.location.reload()
      }}
    >
      Reload this page
    </button>
    <details className="error-details">
      <summary>Click for error details</summary>
      Info:{errorInfo && <pre style={{ whiteSpace: 'pre-wrap' }}>{errorInfo?.componentStack.toString()}</pre>}
      ErrorId:{errorId && errorId}
    </details>
  </div>
)

Error.propTypes = {
  errorInfo: PropTypes.string,
  errorId: PropTypes.string,
}

export default Error
