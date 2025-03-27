import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para que a próxima renderização mostre a UI de fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Você também pode registrar o erro em um serviço de relatório de erros
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Em produção, você poderia enviar para um serviço como Sentry
    console.error("Erro capturado pela ErrorBoundary:", error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI de fallback
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-12 w-12 text-red-600" aria-hidden="true" />
              </div>
              <h2 className="mt-6 text-2xl font-extrabold text-gray-900">Ops! Algo deu errado</h2>
              <p className="mt-2 text-sm text-gray-600">
                Ocorreu um erro inesperado ao renderizar esta página.
              </p>
              
              {this.props.showDetails && this.state.error && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md text-left overflow-auto text-xs w-full">
                  <details>
                    <summary className="font-medium text-red-600 cursor-pointer mb-2">
                      Detalhes do erro (para desenvolvedores)
                    </summary>
                    <p className="whitespace-pre-wrap font-mono text-gray-800">
                      {this.state.error && this.state.error.toString()}
                    </p>
                    <p className="whitespace-pre-wrap font-mono text-gray-800 mt-2">
                      {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </p>
                  </details>
                </div>
              )}
              
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={this.handleRefresh}
                  className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Tentar novamente
                </button>
                <button
                  onClick={this.handleGoHome}
                  className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <Home size={16} className="mr-2" />
                  Voltar ao início
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Caso contrário, renderiza os filhos normalmente
    return this.props.children;
  }
}

export default ErrorBoundary;