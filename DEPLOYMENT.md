# Rivora DeFi Analytics - Production Deployment Guide

## 🚀 Production Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- WalletConnect Project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com)
- 1inch API Key from [1inch Developer Portal](https://portal.1inch.dev/)

### Environment Configuration

1. **Copy environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Configure environment variables:**
   ```bash
   # WalletConnect Project ID (Required)
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
   
   # 1inch API Configuration (Required)
   ONEINCH_API_KEY=your_api_key_here
   ONEINCH_API_BASE_URL=https://api.1inch.dev
   ```

### Build & Deploy

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run production build:**
   ```bash
   npm run production
   ```

3. **Start production server:**
   ```bash
   npm start
   ```

### Deployment Platforms

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify
```bash
# Build command: npm run build
# Publish directory: .next
```

#### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Performance Optimizations

### Production Features
- ✅ TensorFlow.js optimization for server environments
- ✅ Error boundaries for graceful failure handling
- ✅ Chunk splitting for optimal loading
- ✅ Bundle analysis support
- ✅ TypeScript type checking
- ✅ ESLint code quality checks

### Build Analysis
```bash
npm run build:analyze
```

### Performance Monitoring
- Monitor Core Web Vitals
- Track API response times
- Set up error tracking (Sentry recommended)

## 🛡️ Security Considerations

### API Keys
- Never commit API keys to version control
- Use environment variables for all secrets
- Rotate keys regularly

### Rate Limiting
- 1inch API has built-in rate limiting
- Application includes intelligent caching
- Fallback to mock data when limits exceeded

### Wallet Security
- WalletConnect uses industry-standard security
- No private keys stored or transmitted
- All transactions require user confirmation

## 📊 Monitoring & Analytics

### Health Checks
- `/api/health` - Application health status
- Monitor scoring engine performance
- Track 1inch API availability

### Error Handling
- Graceful degradation when APIs unavailable
- User-friendly error messages
- Automatic retry mechanisms

## 🔄 Updates & Maintenance

### Regular Updates
1. Update dependencies monthly
2. Monitor 1inch API changelog
3. Update WalletConnect configuration
4. Review and update scoring algorithms

### Backup Strategy
- Export scoring configurations
- Backup environment variables
- Document custom modifications

## 🎯 Production Checklist

- [ ] Valid WalletConnect Project ID configured
- [ ] 1inch API key with appropriate rate limits
- [ ] Error boundaries tested
- [ ] Performance metrics baseline established
- [ ] Monitoring and alerting configured
- [ ] Security headers configured
- [ ] SSL/TLS certificate installed
- [ ] CDN configured for static assets
- [ ] Database backup strategy (if applicable)
- [ ] Incident response plan documented

## 📞 Support

For production issues:
1. Check application logs
2. Verify API key validity
3. Test with demo data
4. Review error boundaries
5. Contact 1inch support for API issues

## 🎉 Demo Mode

For demonstration purposes, set:
```bash
NEXT_PUBLIC_ENABLE_DEMO_MODE=true
```

This enables fallback data when real APIs are unavailable.
