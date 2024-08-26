const _cache = new Map<string, any>();

export default {
   set(key: string, value: any) {
      _cache.set(key, value);
   },
   get(key: string) {
      return _cache.get(key);
   },
   has(key: string) {
      return _cache.has(key);
   },
   delete(key: string) {
      _cache.delete(key);
   }
}