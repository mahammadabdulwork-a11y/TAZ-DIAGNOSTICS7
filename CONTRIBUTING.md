# 🤝 Contributing to TAZ DIAGNOSTIC

Thank you for your interest in contributing to TAZ DIAGNOSTIC!

---

## 🛠️ Development Workflow

1. **Fork or Clone the Repository**:
   ```bash
   git clone https://github.com/woonnajeevan7-coder/TAZ-DIAGNOSTIC.git
   ```

2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install Dependencies**:
   ```bash
   # Client
   cd client && npm install

   # Server
   cd ../server && npm install
   ```

4. **Verify Code & Builds**:
   ```bash
   cd client && npm run build
   ```

5. **Submit a Pull Request**:
   Push your branch to GitHub and create a PR with a clear summary of your changes.

---

## 🎨 Code Style Guidelines
- **UI & CSS**: Maintain the *Premium Maroon Medical* color palette (`#5B0A1A`, `#65091D`).
- **Responsiveness**: Ensure all new components are tested on both desktop (`> 1024px`) and mobile (`< 600px`) viewports.
- **State Management**: Keep components pure and use localStorage helpers (`STORAGE` utilities) for persistent offline state.
