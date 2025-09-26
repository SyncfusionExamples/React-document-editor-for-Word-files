import React, { useRef, useEffect } from 'react';
import './App.css';
import { DocumentEditorContainerComponent, Ribbon } from '@syncfusion/ej2-react-documenteditor';
DocumentEditorContainerComponent.Inject(Ribbon);

function App() {
  const containerRef = useRef<DocumentEditorContainerComponent | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const form = new FormData();
      form.append('DocumentName', 'Getting Started.docx'); // Your server-side document
      fetch(container.serviceUrl + 'LoadDocument', { method: 'POST', body: form })
        .then(res => res.text())
        .then(sfdt => {
          if (container.documentEditor) {
            container.documentEditor.open(sfdt);
          }
        });
    }
  }, []);

  return (
    <div id="editorArea">
      <DocumentEditorContainerComponent
        id="container"
        ref={containerRef}
        height={'590px'}
        serviceUrl="http://localhost:62880/api/documenteditor/"
        toolbarMode="Ribbon"
      />
    </div>
  );
}
export default App;