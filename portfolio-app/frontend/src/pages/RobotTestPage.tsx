import SimpleRobotTest from '../components/welcome/SimpleRobotTest';

const RobotTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Simple Robot Hover Test</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Instructions:</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Move your mouse over the robot</li>
            <li>The debug panel should show "Hovering: YES" when over the robot</li>
            <li>The cursor should change to a pointer when hovering</li>
            <li>Check the browser console for hover state changes</li>
          </ul>
        </div>
        
        <SimpleRobotTest />
        
        <div className="mt-8 p-4 bg-yellow-100 rounded-lg">
          <h3 className="font-semibold mb-2">What to test:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Hover detection from all angles (top, bottom, sides)</li>
            <li>Cursor changes to pointer when hovering</li>
            <li>Debug panel updates in real-time</li>
            <li>Console logs show hover state changes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RobotTestPage; 